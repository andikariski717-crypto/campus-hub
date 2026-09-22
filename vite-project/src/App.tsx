import { useMemo, useState } from 'react'
import './App.css'
import './data'

const students = (globalThis as any).students as { nama: string; nilai: number }[]

const announcements = [
  { title: 'Judul Pengumuman 1', description: 'Saya sedang belajar membuat web.' },
  { title: 'Judul Pengumuman 2', description: 'Dan saya belajar web dari 0.' },
  { title: 'Judul Pengumuman 3', description: 'Dan saya perlahan bisa.' },
]

type SearchResult = {
  id: string
  type: 'Mahasiswa' | 'Pengumuman'
  title: string
  subtitle: string
  data: { nama?: string; nilai?: number; title?: string; description?: string }
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[number] | null>(null)

  const searchResults = useMemo<SearchResult[]>(() => {
    const keyword = query.trim().toLowerCase()

    if (!keyword) {
      return []
    }

    return students
      .filter((student) => student.nama.toLowerCase().includes(keyword))
      .map((student) => ({
        id: `student-${student.nama}`,
        type: 'Mahasiswa' as const,
        title: student.nama,
        subtitle: 'Klik untuk lihat nilai',
        data: student,
      }))
      .slice(0, 6)
  }, [query])

  const handleSelectResult = (item: SearchResult) => {
    setQuery(item.title)
    setSelectedStudent(item.data as (typeof students)[number])
  }

  return (
    <>
      <header className="topbar">
        <div id="heading">
          <h2>HEADER</h2>
          <p>Kampus Hub</p>
          <p>Papan Pengumuman UNIWA</p>
        </div>

        <nav aria-label="Navigasi utama">
          <ul>
            <li>Beranda</li>
            <li>Pengumuman</li>
            <li>Data Mahasiswa</li>
          </ul>
        </nav>
      </header>

      <main className="page-content">
        <h1>Pengumuman Terbaru</h1>

        <section className="search-panel" aria-label="Pencarian kampus">
          <div className="youtube-searchwrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="searchInput"
              type="text"
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value
                setQuery(nextValue)
                setSelectedStudent(null)
              }}
              placeholder="Cari nama mahasiswa..."
              aria-label="Cari nama mahasiswa"
            />
            <button type="button" className="search-button">
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="search-result" role="listbox" aria-label="Hasil pencarian">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="search-item"
                  onClick={() => handleSelectResult(item)}
                >
                  <span className="search-badge">{item.type}</span>
                  <span className="search-texts">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          {selectedStudent && (
            <div className="student-card" aria-live="polite">
              <h3>{selectedStudent.nama}</h3>
              <p>Nilai: {selectedStudent.nilai}</p>
            </div>
          )}
        </section>

        <section className="announcement-list" aria-label="Daftar pengumuman">
          {announcements.map((announcement) => (
            <article key={announcement.title} className="announcement-item">
              <h3>{announcement.title}</h3>
              <p>{announcement.description}</p>
            </article>
          ))}
        </section>

      </main>

      <section className="about-section">
        <h2>Tentang Cerita Saya</h2>
        <p>
          Saya sedang belajar membuat website dari dasar menggunakan HTML, CSS, dan
          JavaScript.
        </p>
      </section>

      <footer>
        Pemrograman Web - 2026 -
        {` Moch Andika Riski Maulana / 20252210173`}
      </footer>
    </>
  )
}

export default App
