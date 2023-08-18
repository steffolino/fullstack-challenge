import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react"
import React from "react"
import { translate } from "../utils/language.utils"

interface Props {
    isOpen: boolean
    onClose: () => void
    onActivate: () => void
}

export default function ActivateProjectConfirmation({ isOpen, onClose, onActivate }: Props) {
    const cancelRef = React.useRef(null)

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{translate('ACTIVATE_PROJECT')}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {translate('ACTIVATE_PROJECT_DESCRIPTION')}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            {translate('NO')}
                        </Button>
                        <Button colorScheme='green' ml={3} onClick={onActivate}>
                            {translate('YES')}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}