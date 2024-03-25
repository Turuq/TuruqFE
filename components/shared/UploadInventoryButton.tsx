"use client";

import { ArrowUpFromLineIcon, Loader2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/auth-dialog";
import { uploadInventoryExcelAction } from "@/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";

export default function UploadInventoryButton({
  variant,
}: {
  variant: "default" | "icon";
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState({ error: false, message: "" });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  async function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (file) {
      setLoading(true);
      setFormError({ error: false, message: "" });
      const formData = new FormData();
      formData.append("file", file);
      const { error } = await uploadInventoryExcelAction({
        file: formData,
      });
      if (error) {
        setFormError({ error: true, message: error.message });
        setLoading(false);
        return;
      }
      toast({
        title: "Inventory Uploaded Successfully",
        description: moment().format("MMMM Do YYYY, h:mm:ss a"),
        duration: 10000,
      });
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div
            className={`bg-white p-2 rounded-lg ${variant === "default" ? "w-44 hover:bg-accent hover:text-white" : "w-auto"} text-sm text-accent group`}
          >
            <div className="flex items-center gap-3 w-full">
              <div className={"w-[10%] group-hover:hidden block"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-inherit"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M8 13h2" />
                  <path d="M14 13h2" />
                  <path d="M8 17h2" />
                  <path d="M14 17h2" />
                </svg>
              </div>
              <div className={"w-[10%] group-hover:block hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5 text-inherit"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  <path d="M12 12v6" />
                  <path d="m15 15-3-3-3 3" />
                </svg>
              </div>
              {variant === "default" && (
                <div className={"w-full flex items-center justify-center"}>
                  <span className="text-sm lg:text-inherit text-center">
                    Upload Inventory
                  </span>
                </div>
              )}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="lg:max-w-xl">
          <DialogHeader>
            <DialogTitle className="uppercase text-accent font-bold lg:text-base text-sm flex justify-center">
              Upload Inventory Using An Excel File
            </DialogTitle>
            <DialogDescription>
              {formError.error && (
                <Alert className="bg-red-500 text-white border-red-500">
                  <AlertTitle className="capitalize">
                    Unable to upload inventory
                  </AlertTitle>
                  <AlertDescription>{formError.message}</AlertDescription>
                </Alert>
              )}
            </DialogDescription>
            <div
              {...getRootProps()}
              className="w-full flex items-center justify-center h-40 border border-dashed border-accent p-5 bg-gray-200"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div className="flex flex-col gap-1 items-center justify-center w-full h-full">
                  <ArrowUpFromLineIcon className="size-5 text-accent" />
                  <p className="cursor-default">{"Drag and Drop Here"}</p>
                  <p className="cursor-default">or</p>
                  <p className="text-accent font-semibold cursor-pointer hover:underline">
                    Browse Files
                  </p>
                </div>
              )}
            </div>
            <div className={"flex items-center justify-between gap-5"}>
              <p className="text-xs text-accent font-semibold italic">
                {"Accepted File Types: .xlsx only"}
              </p>
              {file && (
                <p className="text-xs text-accent font-semibold">
                  {file.name} - {file.size} bytes
                </p>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                className="rounded-xl bg-accent p-2 text-white disabled:bg-gray-500"
                disabled={loading || !file}
                onClick={(e) => handleFileUpload(e)}
              >
                {loading ? (
                  <Loader2 className="size-5 text-white animate-spin" />
                ) : (
                  "Upload File"
                )}
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
