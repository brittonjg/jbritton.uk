import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6">
        <SocialLinks />
        <p className="text-sm text-text-tertiary">
          &copy; {new Date().getFullYear()} James Britton
        </p>
      </div>
    </footer>
  );
}
