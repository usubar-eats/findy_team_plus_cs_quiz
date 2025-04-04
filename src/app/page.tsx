import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">ソフトウェア開発クイズ</h1>
        <p className="text-lg text-gray-600 mb-8">
          開発プロセスに関する知識をテストしましょう！
        </p>
        <Link
          href="/quiz"
          className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors inline-block font-semibold shadow-lg"
        >
          クイズを始める
        </Link>
      </div>
    </main>
  );
}
