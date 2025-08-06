import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white/70 backdrop-blur-md text-zinc-800 px-6 pt-24 pb-12">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="text-base text-zinc-700">
          We'd love to hear from you! Reach out to us anytime via the following ways:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Mail className="text-zinc-600 mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-zinc-600">prativmallick33@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-zinc-600 mt-1" />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-zinc-600">+91 8777878074</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-zinc-600 mt-1" />
            <div>
              <p className="font-medium">Address</p>
              <p className="text-zinc-600">
                Chinar Park, New Town<br />
                Kolkata, West Bengal 700157
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
