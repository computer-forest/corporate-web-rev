import Button from "./Button";
import { ROUTES } from "@/lib/app-routing";
import { SITE } from "@/constants/site";
import styles from "./cta-banner.module.scss";

interface Props {
  title?: string;
  body?: string;
  action?: { href: string; label: string };
}

export default function CtaBanner({
  title = "Bring us in before the survey scope is written.",
  body = `Tell us what you are connecting and when it has to energise, at ${SITE.email}. We will tell you what the survey needs to answer.`,
  action = { href: ROUTES.leaderboard, label: "See the delivery record" },
}: Props) {
  return (
    <section className={styles.banner}>
      <div className="shell">
        <div className={styles.inner}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.body}>{body}</p>
          </div>
          <Button href={action.href} variant="ghost">
            {action.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
