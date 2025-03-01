

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ProfileManagement() {
  return (
    <div className="flex justify-center items-center min-h-screen lg:pl-50 bg-gray-100 px-4">
      <div className="w-full max-w-4xl space-y-8 p-6 bg-white shadow-lg rounded-xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">👤 Profile Management</h2>
          <p className="text-gray-600 mt-1">Update your profile information and account settings.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                  <User className="h-10 w-10 text-gray-600" />
                </div>
                <Button variant="outline">Change Avatar</Button>
              </div>
              <Separator />
              <div className="space-y-3">
                <label className="block text-sm font-medium">Full Name</label>
                <Input defaultValue="John Doe" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium">Email Address</label>
                <Input type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium">Phone Number</label>
                <Input type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium">Address</label>
                <Input defaultValue="123 Main St, Anytown, USA" />
              </div>
              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Account Security & Notifications */}
          <div className="space-y-6">
            {/* Account Security */}
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Current Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-medium">Confirm New Password</label>
                  <Input type="password" />
                </div>
                <Button className="w-full">Update Password</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white shadow-md rounded-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Email Notifications</div>
                    <div className="text-xs text-gray-500">Receive notifications about inquiries and offers</div>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-full after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">SMS Notifications</div>
                    <div className="text-xs text-gray-500">Receive text messages for important updates</div>
                  </div>
                  <label className="relative inline-flex cursor-pointer">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 peer-checked:after:translate-x-full after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:bg-white after:rounded-full after:transition-all"></div>
                  </label>
                </div>
                <Button variant="outline" className="w-full">Save Preferences</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
