// supabase/functions/settings/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const url = new URL(req.url);
  const method = req.method.toUpperCase();

  // allow OPTIONS for preflight (good practice)
  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (method === "GET") {
    const { data, error } = await supabase
      .from("company_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { "Content-Type": "application/json" }});
    }

    return new Response(JSON.stringify({ settings: data }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  if (method === "POST") {
    try {
      const body = await req.json();

      // upsert single row (use some consistent id if you want one row)
      const upsertPayload = {
        // if you prefer a uuid id, remove the id below
        id: 1,
        name: body.companyName ?? body.name ?? body.company_name ?? body.companyName,
        logo_url: body.logoUrl ?? body.logo_url ?? body.logo,
        currency: body.currency ?? body.currency,
        address: body.address ?? null,
        city: body.city ?? null,
        state: body.state ?? null,
        zip_code: body.zipCode ?? null,
        country: body.country ?? null,
        phone: body.phone ?? null,
        email: body.email ?? null,
        website: body.website ?? null,
        gstin: body.gstin ?? null,
        pan: body.pan ?? null,
        updated_at: new Date().toISOString(),
      };

      // upsert by id = 1 to maintain single-row settings (if id type mismatch, DB will adjust)
      const { data, error } = await supabase
        .from("company_settings")
        .upsert(upsertPayload, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { "Content-Type": "application/json" }});
      }

      return new Response(JSON.stringify({ settings: data }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400, headers: { "Content-Type": "application/json" }});
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});
