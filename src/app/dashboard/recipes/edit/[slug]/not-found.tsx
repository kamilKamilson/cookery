import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Nie znaleziono</h2>
      <p>Taki przepis nie istnieje</p>
      <Link href="/dashboard/recipes">Wróć na listę przepisów</Link>
    </div>
  );
}
