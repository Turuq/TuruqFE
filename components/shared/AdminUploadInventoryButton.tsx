"use client";

import { ArrowUpFromLineIcon, FileUpIcon, Loader2 } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function AdminUploadInventoryButton({
  variant,
}: {
  variant: "default" | "icon";
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
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
      formData.append("file", file, file.name);
      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });
      if (res.status !== 200) {
        setFormError({ error: true, message: "Something went wrong." });
        setLoading(false);
        return;
      }
      setLoading(false);
      setFile(undefined);
      setOpen(false);
    }
  }

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <button
            className={`bg-white p-2 rounded-xl w-auto text-sm ${
              variant === "icon" ? "text-accent/80" : "text-accent"
            } hover:text-accent flex items-center`}
          >
            <FileUpIcon className="size-4 lg:size-5 text-inherit mr-2" />
            {variant === "default" && (
              <span className="text-start text-xs lg:text-inherit">
                Upload Excel File
              </span>
            )}
          </button>
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
              {loading && (
                <Alert className="bg-accent text-white border-accent">
                  <AlertTitle className="capitalize flex items-center gap-1">
                    <ArrowUpFromLineIcon className="size-4 inherit animate-bounce" />
                    <span>Inventory Upload In Progress</span>
                  </AlertTitle>
                  <AlertDescription>
                    {
                      "Just a moment! We're working hard to update your inventory. This might take a couple of minutes."
                    }
                  </AlertDescription>
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
            <div className="flex items-center justify-end mt-5">
              <button
                className="rounded-xl bg-accent flex items-center justify-center p-2 text-white disabled:bg-gray-500 w-40 mt-5"
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
