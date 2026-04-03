import { useState, useMemo } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ServiceCategory = "all" | "general" | "cosmetic" | "emergency";

interface TimeSlot {
  time: string;
  service: string;
  duration: string;
  category: ServiceCategory;
  available: boolean;
}

const generateSlots = (day: number): TimeSlot[] => {
  const slots: TimeSlot[] = [
    { time: "9:00 AM", service: "Cleaning", duration: "45 min", category: "general", available: true },
    { time: "10:00 AM", service: "Consultation", duration: "30 min", category: "general", available: day !== 2 },
    { time: "11:00 AM", service: "Cosmetic Consult", duration: "60 min", category: "cosmetic", available: true },
    { time: "1:00 PM", service: "Cleaning", duration: "45 min", category: "general", available: day !== 4 },
    { time: "2:00 PM", service: "Emergency", duration: "Varies", category: "emergency", available: true },
    { time: "3:30 PM", service: "Consultation", duration: "30 min", category: "general", available: day !== 1 },
    { time: "4:30 PM", service: "Cosmetic Consult", duration: "60 min", category: "cosmetic", available: true },
  ];
  return slots;
};

const filterTabs: { label: string; value: ServiceCategory }[] = [
  { label: "All", value: "all" },
  { label: "General", value: "general" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Emergency", value: "emergency" },
];

const BookingSection = () => {
  const [filter, setFilter] = useState<ServiceCategory>("all");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mobileDate, setMobileDate] = useState<Date | undefined>(new Date());

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const slots = useMemo(() => {
    const s = generateSlots(selectedDay);
    if (filter === "all") return s;
    return s.filter((sl) => sl.category === filter);
  }, [selectedDay, filter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 md:py-28 bg-surface">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl p-10 shadow-sm border border-border"
          >
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground">Appointment Requested</h3>
            <p className="mt-3 text-muted-foreground">
              Thank you! We'll confirm your appointment shortly via email or phone.
            </p>
            <Button className="mt-6 rounded-lg" onClick={() => setSubmitted(false)}>
              Book Another
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-surface">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Book Your Appointment
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Choose a convenient time — we'll handle the rest.
          </p>
          <p className="mt-2 text-sm text-accent font-medium">
            Book ahead — slots fill quickly
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px]",
                filter === tab.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Calendar / Slots — Desktop: 5-day, Mobile: single day */}
          <div className="lg:col-span-3">
            {/* Mobile date picker */}
            <div className="lg:hidden mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start rounded-lg min-h-[44px]">
                    <CalendarIcon className="me-2 w-4 h-4" />
                    {mobileDate ? format(mobileDate, "EEEE, MMM d") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={mobileDate}
                    onSelect={setMobileDate}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Desktop 5-day header */}
            <div className="hidden lg:grid grid-cols-5 gap-2 mb-4">
              {weekDays.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={cn(
                    "p-3 rounded-lg text-center transition-all border",
                    selectedDay === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border hover:border-primary/40 text-foreground"
                  )}
                >
                  <div className="text-xs font-medium opacity-70">{format(day, "EEE")}</div>
                  <div className="text-lg font-bold">{format(day, "d")}</div>
                </button>
              ))}
            </div>

            {/* Slots grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {slots.map((slot, i) => (
                <button
                  key={`${slot.time}-${i}`}
                  onClick={() => slot.available && setSelectedSlot(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-start transition-all min-h-[44px]",
                    !slot.available && "opacity-40 cursor-not-allowed bg-muted",
                    slot.available && selectedSlot === slot.time
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : slot.available
                      ? "border-border bg-card hover:border-primary/40"
                      : "border-border"
                  )}
                >
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{slot.time}</div>
                    <div className="text-xs text-muted-foreground">
                      {slot.service} · {slot.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">Your Details</h3>
              <Input placeholder="Full Name" required className="rounded-lg min-h-[44px]" />
              <Input placeholder="Phone Number" type="tel" required className="rounded-lg min-h-[44px]" />
              <Input placeholder="Email Address" type="email" required className="rounded-lg min-h-[44px]" />
              <Select>
                <SelectTrigger className="rounded-lg min-h-[44px]">
                  <SelectValue placeholder="Select Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="cosmetic">Cosmetic Consultation</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Preferred Time"
                value={selectedSlot || ""}
                readOnly
                className="rounded-lg min-h-[44px] bg-muted"
              />
              <Button type="submit" className="w-full rounded-lg min-h-[48px] text-base">
                Confirm Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
