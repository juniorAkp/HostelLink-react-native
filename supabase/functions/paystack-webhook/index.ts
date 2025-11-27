import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 1. Setup Supabase Client
const supabase = createClient(
  Deno.env.get("URL") ?? "",
  Deno.env.get("SERVICE_ROLE_KEY") ?? ""
);

// 2. Get Paystack Secret from Environment Variables
const PAYSTACK_SECRET_KEY = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";

Deno.serve(async (req) => {
  try {
    // A. Only allow POST requests
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    // B. Verify Signature
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return new Response("No signature provided", { status: 401 });
    }

    const body = await req.text();

    // Verify HMAC SHA512 Signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(PAYSTACK_SECRET_KEY),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["verify"]
    );

    const verified = await crypto.subtle.verify(
      "HMAC",
      key,
      hexToUint8Array(signature),
      encoder.encode(body)
    );

    if (!verified) {
      return new Response("Invalid signature", { status: 401 });
    }

    // C. Process the Event
    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { data } = event;
      const { reference, amount, status, metadata } = data;

      // Security Check: Verify the amount paid matches your expected price
      // Set PRICE_PESEWAS in your Supabase Secrets (e.g. 5000 for 50 GHS)
      const EXPECTED_PRICE = Number(Deno.env.get("PRICE_PESEWAS") ?? "0");

      if (EXPECTED_PRICE > 0 && amount < EXPECTED_PRICE) {
        console.error(
          `Fraud attempt: User paid ${amount} but expected ${EXPECTED_PRICE}`
        );
        return new Response("Insufficient payment", { status: 400 });
      }

      const userId = metadata?.user_id;

      if (!userId) {
        console.error("No user_id found in metadata");
        return new Response("No user_id in metadata", { status: 400 });
      }

      console.log(`Processing payment for user: ${userId}`);

      // 1. Record Transaction
      const { error: txnError } = await supabase.from("transactions").insert({
        user_id: userId,
        amount: amount / 100, // Convert pesewas to GHS
        status: status,
        reference: reference,
        created_at: new Date().toISOString(),
      });

      if (txnError) {
        console.error("Error creating transaction:", txnError);
      }

      // 2. Upgrade User Profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: "partner" }) // Change to 'admin' if that's your role name
        .eq("id", userId);

      if (profileError) {
        console.error("Error upgrading profile:", profileError);
        return new Response("Error upgrading profile", { status: 500 });
      }

      console.log(`User ${userId} upgraded successfully.`);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
});

// Helper function
function hexToUint8Array(hexString: string) {
  return new Uint8Array(
    hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
}
