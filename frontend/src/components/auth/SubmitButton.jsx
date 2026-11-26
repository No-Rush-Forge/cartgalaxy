import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubmitButton({ loading, loadingLabel, children }) {
  return (
    <Button type="submit" size="lg" className="w-full" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> {loadingLabel || "Please wait…"}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
