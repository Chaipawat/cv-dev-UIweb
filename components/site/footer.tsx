import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.displayName}
        </span>
        <span>
          {profile.positioning} · {profile.location}
        </span>
      </div>
    </footer>
  );
}
