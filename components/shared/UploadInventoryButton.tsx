"use client";

import { FileUpIcon, Loader2 } from "lucide-react";
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
            </DialogDescription>
            <div
              {...getRootProps()}
              className="w-full border border-dashed border-accent p-5 bg-gray-200"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  {"Drag 'n' drop some files here,"}{" "}
                  <span className="text-accent underline cursor-pointer">
                    or click to select files
                  </span>
                </p>
              )}
            </div>
            {file && (
              <p>
                {file.name} - {file.size} bytes
              </p>
            )}
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
