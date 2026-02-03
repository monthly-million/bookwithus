import { Sheet, Card } from "@mui/joy";

interface ModalProps {
  children?: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {

  return (
    <Sheet 
      sx={{
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 1000, 
        backgroundColor: 'rgba(13, 13, 13, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card 
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '30px',
          boxSizing: 'border-box',
          width: '90%'
        }}
      >
        {children}
      </Card>
    </Sheet>
  )
}