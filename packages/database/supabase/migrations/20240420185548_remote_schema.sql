create table "public"."Customer" (
    "id" uuid not null default auth.uid(),
    "stripeId" text not null
);


alter table "public"."Customer" enable row level security;

CREATE UNIQUE INDEX "Customer_pkey" ON public."Customer" USING btree (id);

alter table "public"."Customer" add constraint "Customer_pkey" PRIMARY KEY using index "Customer_pkey";

alter table "public"."Customer" add constraint "public_Customer_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."Customer" validate constraint "public_Customer_id_fkey";

grant delete on table "public"."Customer" to "anon";

grant insert on table "public"."Customer" to "anon";

grant references on table "public"."Customer" to "anon";

grant select on table "public"."Customer" to "anon";

grant trigger on table "public"."Customer" to "anon";

grant truncate on table "public"."Customer" to "anon";

grant update on table "public"."Customer" to "anon";

grant delete on table "public"."Customer" to "authenticated";

grant insert on table "public"."Customer" to "authenticated";

grant references on table "public"."Customer" to "authenticated";

grant select on table "public"."Customer" to "authenticated";

grant trigger on table "public"."Customer" to "authenticated";

grant truncate on table "public"."Customer" to "authenticated";

grant update on table "public"."Customer" to "authenticated";

grant delete on table "public"."Customer" to "service_role";

grant insert on table "public"."Customer" to "service_role";

grant references on table "public"."Customer" to "service_role";

grant select on table "public"."Customer" to "service_role";

grant trigger on table "public"."Customer" to "service_role";

grant truncate on table "public"."Customer" to "service_role";

grant update on table "public"."Customer" to "service_role";


