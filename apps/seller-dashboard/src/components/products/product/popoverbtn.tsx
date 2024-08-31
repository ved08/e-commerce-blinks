"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { editProduct } from "@/lib/action"
import { ProductInput } from "@/lib/validation"
import { UploadIcon } from "lucide-react"
import { useState } from "react"
 
export  default function PopoverButton({props}: any) {
    const [image, setImage] = useState<string>(props.imageUrl);
    const [title, setTitle] = useState<string>(props.title);
    const [description, setDescription] = useState<string>(props.description);
    const [price, setPrice] = useState<string>(props.price);
    const [stock, setStock] = useState<string>(props.stock);
    const [name, setName] = useState<string>(props.name);
    const [label, setLabel] = useState<string>(props.label);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const saveChanges = async () => {
    const productObj: ProductInput = {imageUrl: image, title, description, price, stock, name, label}
    const res = await editProduct(props.id, productObj)
    console.log(res)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Edit Details</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Change product details</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="uploadbtn">Image</Label>
              <Button
                id="uploadbtn"
                variant="outline"
                size="sm"
                className="col-span-2 h-8"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Title</Label>
              <Input
                id="maxWidth"
                defaultValue={props.title}
                className="col-span-2 h-8"
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                defaultValue={props.name}
                className="col-span-2 h-8"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                defaultValue={props.description}
                className="col-span-2 h-8"
                onChange={e => setLabel(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Description</Label>
              <Textarea
                id="width"
                defaultValue={props.description}
                className="col-span-2 h-8"
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Price</Label>
              <Input
                id="height"
                defaultValue={props.price}
                className="col-span-2 h-8"
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Stock</Label>
              <Input
                id="maxHeight"
                defaultValue={props.stock}
                className="col-span-2 h-8"
                onChange={e => setStock(e.target.value)}
              />
            </div>
          </div>
        <Button  variant="destructive" onClick={saveChanges}>Save Changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}