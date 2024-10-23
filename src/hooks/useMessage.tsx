import { useToast } from "@chakra-ui/react"
import { useCallback } from "react";

export const useMessage = () => {
  const toast = useToast();

  type Props = {
    title: string;
    status: "info" | "warning" | "success" | "error";
  }
  const showMessage = useCallback(({title, status}: Props) => {
    toast({
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    })
  }, [toast]) 

  return { showMessage }
}