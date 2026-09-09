import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/app-routing";

export default function RootPage() {
  redirect(ROUTES.home);
}
