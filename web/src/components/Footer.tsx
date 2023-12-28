import { observer } from 'mobx-react-lite'

export const Footer = observer(() => {
  return (
    <footer className="footer flex justify-center p-10 bg-base-300 text-base-content">
      <div>
        <span className="footer-title">DESIGN BY FRANK</span>
      </div>
    </footer>
  )
})
