import { Button, Modal, useOverlayState } from "@heroui/react";

interface modal {
  image: string;
  state: ReturnType<typeof useOverlayState>;
}

export default function ImageModal({ image, state }: modal) {
  return (
    <>
      <Modal isOpen={state.isOpen} onOpenChange={state.setOpen}>
        <Button hidden></Button>
        <Modal.Backdrop
          className="
          data-entering:duration-400
          data-entering:ease-[cubic-bezier(0.16,1,0.3,1)]
          data-exiting:duration-200
          data-exiting:ease-[cubic-bezier(0.7,0,0.84,0)]
        "
        >
          <Modal.Container
            className="
            data-entering:animate-in
            data-entering:fade-in-0
            data-entering:zoom-in-95
            data-entering:duration-400
            data-entering:ease-[cubic-bezier(0.16,1,0.3,1)]
            data-exiting:animate-out
            data-exiting:fade-out-0
            data-exiting:zoom-out-95
            data-exiting:duration-200
            data-exiting:ease-[cubic-bezier(0.7,0,0.84,0)]
          "
            size="cover"
          >
            <Modal.Dialog className="w-fit h-fit shadow-none bg-transparent">
              <Modal.CloseTrigger />

              <img
                className="rounded-xl w-fit mx-auto h-full object-contain"
                src={image}
              />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
