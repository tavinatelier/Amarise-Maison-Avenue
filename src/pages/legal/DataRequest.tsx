/**
 * DATA REQUEST PAGE
 * GDPR data request form for customers
 */

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Download, Trash2, Eye, FileEdit } from "lucide-react";

export default function DataRequest() {
  const [requestType, setRequestType] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestType || !email || !confirmed) {
      toast.error("Please complete all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Your request has been submitted");
  };

  if (submitted) {
    return (
      <Layout>
        <SEOHead
          title="Data Request Submitted | AMARISÉ"
          description="Your data request has been submitted successfully."
        />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-light tracking-wide mb-4">Request Submitted</h1>
          <p className="text-muted-foreground mb-8">
            We have received your data request. Our team will process your request within 30 days 
            as required by GDPR. You will receive a confirmation email at <strong>{email}</strong>.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Reference number: <span className="font-mono">DR-{Date.now().toString(36).toUpperCase()}</span>
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            Submit Another Request
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Data Request | AMARISÉ"
        description="Submit a GDPR data request to access, correct, or delete your personal information."
      />
      <div className="max-w-2xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-light tracking-wide mb-4">Data Request</h1>
        <p className="text-muted-foreground mb-12">
          Under the General Data Protection Regulation (GDPR), you have the right to access, 
          correct, or delete your personal data. Use this form to submit your request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Request Type */}
          <div className="space-y-4">
            <Label className="text-base">What would you like to do?</Label>
            <RadioGroup value={requestType} onValueChange={setRequestType}>
              <Card className={`border-border cursor-pointer transition-colors ${requestType === "access" ? "border-foreground" : ""}`}>
                <CardHeader className="pb-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="access" id="access" />
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <CardTitle className="text-base font-medium">Access My Data</CardTitle>
                    </div>
                  </label>
                </CardHeader>
                <CardContent className="pl-10">
                  <CardDescription>
                    Request a copy of all personal data we hold about you
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-border cursor-pointer transition-colors ${requestType === "export" ? "border-foreground" : ""}`}>
                <CardHeader className="pb-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="export" id="export" />
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <CardTitle className="text-base font-medium">Export My Data</CardTitle>
                    </div>
                  </label>
                </CardHeader>
                <CardContent className="pl-10">
                  <CardDescription>
                    Receive your data in a portable, machine-readable format
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-border cursor-pointer transition-colors ${requestType === "correct" ? "border-foreground" : ""}`}>
                <CardHeader className="pb-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="correct" id="correct" />
                    <div className="flex items-center gap-2">
                      <FileEdit className="h-4 w-4" />
                      <CardTitle className="text-base font-medium">Correct My Data</CardTitle>
                    </div>
                  </label>
                </CardHeader>
                <CardContent className="pl-10">
                  <CardDescription>
                    Request corrections to inaccurate personal information
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className={`border-border cursor-pointer transition-colors ${requestType === "delete" ? "border-foreground" : ""}`}>
                <CardHeader className="pb-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <RadioGroupItem value="delete" id="delete" />
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      <CardTitle className="text-base font-medium">Delete My Data</CardTitle>
                    </div>
                  </label>
                </CardHeader>
                <CardContent className="pl-10">
                  <CardDescription>
                    Request permanent deletion of your personal data
                  </CardDescription>
                </CardContent>
              </Card>
            </RadioGroup>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email associated with your account"
              required
            />
            <p className="text-xs text-muted-foreground">
              We will use this email to verify your identity and send updates about your request.
            </p>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Additional Details (Optional)</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any additional information that may help us process your request..."
              rows={4}
            />
          </div>

          {/* Confirmation */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked === true)}
            />
            <label htmlFor="confirm" className="text-sm text-muted-foreground cursor-pointer">
              I confirm that I am the data subject or am authorized to make this request on behalf 
              of the data subject. I understand that AMARISÉ may need to verify my identity before 
              processing this request.
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Request
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We will respond to your request within 30 days. For complex requests, we may extend 
            this period by an additional 60 days with prior notice.
          </p>
        </form>
      </div>
    </Layout>
  );
}
