import { createContext, useContext, useState, ReactNode } from "react";

interface ContactModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <ContactModalContext.Provider
      value={{
        open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => useContext(ContactModalContext);
