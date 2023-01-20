export default function Footer({ strings }){
  return(
    <footer className="footer">
      <p>&copy;{`${new Date().getFullYear()} ${strings.rights}`} </p>
    </footer>
  );
}