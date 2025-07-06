'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function ProposalForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        jobDescription: '',
        clientName: '',
        expertise: '',
        portfolioLinks: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
            <div className="space-y-2">
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                    id="clientName"
                    name="clientName"
                    placeholder="Enter client's name"
                    value={formData.clientName}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste job description here..."
                    value={formData.jobDescription}
                    onChange={handleChange}
                    rows={5}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="expertise">Your Expertise</Label>
                <Textarea
                    id="expertise"
                    name="expertise"
                    placeholder="Describe your expertise..."
                    value={formData.expertise}
                    onChange={handleChange}
                    rows={4}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="portfolioLinks">Portfolio Links</Label>
                <Textarea
                    id="portfolioLinks"
                    name="portfolioLinks"
                    placeholder="Add your portfolio links..."
                    value={formData.portfolioLinks}
                    onChange={handleChange}
                    rows={3}
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    "Generate Proposal"
                )}
            </Button>
        </form>
    );
}
