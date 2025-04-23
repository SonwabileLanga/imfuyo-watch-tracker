
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type AddLivestockFormProps = {
  onAdd: (livestock: {
    name: string;
    type: "cow" | "sheep" | "goat";
    age: string;
    tagId: string;
  }) => void;
  onCancel: () => void;
};

const AddLivestockForm = ({ onAdd, onCancel }: AddLivestockFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState<"cow" | "sheep" | "goat">("cow");
  const [age, setAge] = useState("");
  const [tagId, setTagId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tagId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onAdd({
      name,
      type,
      age,
      tagId,
    });

    // Reset form
    setName("");
    setType("cow");
    setAge("");
    setTagId("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Animal Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter animal name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Animal Type *</Label>
        <Select value={type} onValueChange={(value) => setType(value as "cow" | "sheep" | "goat")}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cow">Cow</SelectItem>
            <SelectItem value="sheep">Sheep</SelectItem>
            <SelectItem value="goat">Goat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g. 3 years"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagId">Tag/Tracker ID *</Label>
        <Input
          id="tagId"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          placeholder="Enter tag or tracker ID"
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Livestock</Button>
      </div>
    </form>
  );
};

export default AddLivestockForm;
