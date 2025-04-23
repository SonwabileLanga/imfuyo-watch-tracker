
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type UserProfileProps = {
  user: {
    name: string;
    phone: string;
    email: string;
    farmName: string;
    location: string;
  };
  onSave: (userData: any) => void;
};

const UserProfile = ({ user, onSave }: UserProfileProps) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userData);
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Profile Information</span>
          {!editing && (
            <Button variant="outline" onClick={() => setEditing(true)}>
              Edit
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {editing ? (
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b">{userData.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {editing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b">{userData.phone}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {editing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b">{userData.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmName">Farm Name</Label>
              {editing ? (
                <Input
                  id="farmName"
                  name="farmName"
                  value={userData.farmName}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b">{userData.farmName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Farm Location</Label>
              {editing ? (
                <Input
                  id="location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                />
              ) : (
                <div className="py-2 border-b">{userData.location}</div>
              )}
            </div>

            {editing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setUserData(user);
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
