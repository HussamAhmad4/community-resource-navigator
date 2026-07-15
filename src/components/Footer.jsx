export default function Footer({ minimal }) {
  if (minimal) return (
    <footer className="app-footer app-footer--minimal">
      <p>General information only — not professional advice. Verify details with official sources.</p>
    </footer>
  )
  return (
    <footer className="app-footer">
      <p>
        Navi provides general information, not professional advice. Always verify with official sources.
        Crisis support: <strong>988</strong> · Text HOME to <strong>741741</strong>
      </p>
    </footer>
  )
}
