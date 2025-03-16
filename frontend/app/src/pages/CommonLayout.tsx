import React, { useState, useContext } from "react"
import { Container } from "@mui/material"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FlashMessage from "../components/FlashMessage"
import { FlashMessageContext } from "../App"

interface CommonLayoutProps {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const { flashMessageSuccess, setFlashMessageSuccess, flashMessageError, setFlashMessageError } = useContext(FlashMessageContext)

  const handleCloseFlashMessageSuccess = () => {
    setFlashMessageSuccess('');
  };
  const handleCloseFlashMessageError = () => {
    setFlashMessageError('');
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Container sx={{ py: 8 }}>
          {children}
        </Container>
        {flashMessageSuccess.length > 0 ? (
          <FlashMessage
            message={flashMessageSuccess}
            severity="success"
            open={true}
            onClose={handleCloseFlashMessageSuccess}
          />
        ) : (<></>)}
        {flashMessageError.length > 0 ? (
          <FlashMessage
            message={flashMessageError}
            severity="error"
            open={true}
            onClose={handleCloseFlashMessageError}
          />
        ) : (<></>)}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
