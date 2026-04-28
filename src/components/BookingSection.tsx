import { useState, useMemo, useId, useCallback } from "react";
import { format, addDays, startOfWeek, startOfDay, isSameDay, getISODay } from "date-fns";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useMotionReduced } from "@/lib/motionReduced";

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

/** Map a calendar date to the same 0–4 weekday index used by the desktop strip (Mon–Fri). Weekends use Fri / Mon slot logic. */
function dateToSlotDayIndex(date: Date): number {
  const iso = getISODay(date);
  if (iso >= 1 && iso <= 5) return iso - 1;
  return iso === 6 ? 4 : 0;
}

/** Snap weekend picks to a weekday so the week strip and calendar stay aligned. */
function normalizeToBusinessDay(date: Date): Date {
  const iso = getISODay(date);
  if (iso >= 1 && iso <= 5) return startOfDay(date);
  return startOfDay(startOfWeek(date, { weekStartsOn: 1 }));
}

const filterTabs: { label: string; value: ServiceCategory }[] = [
  { label: "All", value: "all" },
  { label: "General", value: "general" },
  { label: "Cosmetic", value: "cosmetic" },
  { label: "Emergency", value: "emergency" },
];

const SERVICE_OPTIONS = [
  { value: "cleaning", label: "Cleaning" },
  { value: "consultation", label: "Consultation" },
  { value: "cosmetic", label: "Cosmetic Consultation" },
  { value: "emergency", label: "Emergency" },
] as const;

type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

function serviceLabel(value: string): string {
  const found = SERVICE_OPTIONS.find((o) => o.value === value);
  return found?.label ?? value;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Allows common phone formats; at least 10 digits total. */
const PHONE_DIGIT_RE = /\d/g;

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.match(PHONE_DIGIT_RE);
  return digits !== null && digits.length >= 10;
}

const BookingSection = () => {
  const { instant, reduceMotion } = useMotionReduced();
  const formId = useId();
  const nameId = `${formId}-name`;
  const phoneId = `${formId}-phone`;
  const emailId = `${formId}-email`;
  const serviceId = `${formId}-service`;
  const timeId = `${formId}-time`;
  const mobileDateLabelId = `${formId}-mobile-date`;
  const weekStripLabelId = `${formId}-week-strip`;

  const [filter, setFilter] = useState<ServiceCategory>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(() => normalizeToBusinessDay(new Date()));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceValue | "">("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<string | null>(null);

  const weekDays = useMemo(() => {
    const ws = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 5 }, (_, i) => addDays(ws, i));
  }, [selectedDate]);

  const slotDayIndex = dateToSlotDayIndex(selectedDate);

  const slots = useMemo(() => {
    const s = generateSlots(slotDayIndex);
    if (filter === "all") return s;
    return s.filter((sl) => sl.category === filter);
  }, [slotDayIndex, filter]);

  const validateEmailField = useCallback((value: string) => {
    if (!value.trim()) {
      setEmailError(null);
      return;
    }
    if (!isValidEmail(value)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError(null);
  }, []);

  const validatePhoneField = useCallback((value: string) => {
    if (!value.trim()) {
      setPhoneError(null);
      return;
    }
    if (!isValidPhone(value)) {
      setPhoneError("Enter a valid phone (e.g. +973 XXXX XXXX).");
      return;
    }
    setPhoneError(null);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let ok = true;
    if (!fullName.trim()) {
      setNameError("Please enter your full name.");
      ok = false;
    } else {
      setNameError(null);
    }
    if (!email.trim()) {
      setEmailError("Email is required.");
      ok = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      ok = false;
    } else {
      setEmailError(null);
    }
    if (!phone.trim()) {
      setPhoneError("Phone number is required.");
      ok = false;
    } else if (!isValidPhone(phone)) {
      setPhoneError("Enter a valid phone (e.g. +973 XXXX XXXX).");
      ok = false;
    } else {
      setPhoneError(null);
    }
    if (!service) {
      setServiceError("Please select a service.");
      ok = false;
    } else {
      setServiceError(null);
    }
    if (!selectedSlot) {
      setSlotError("Please choose a time slot.");
      ok = false;
    } else {
      setSlotError(null);
    }
    if (!ok) return;

    setSubmitted(true);
  };

  const handleMobileDateSelect = (d: Date | undefined) => {
    if (!d) return;
    setSelectedDate(normalizeToBusinessDay(d));
    setSelectedSlot(null);
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 md:py-28 bg-surface" aria-labelledby="booking-success-heading">
        <div className="container max-w-2xl">
          <motion.div
            initial={instant ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : undefined}
            className="bg-card rounded-xl p-8 md:p-10 shadow-sm border border-border"
          >
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" aria-hidden />
              <h3 id="booking-success-heading" className="text-2xl font-bold text-foreground">
                Appointment Requested
              </h3>
              <p className="mt-3 text-muted-foreground">
                Thanks, {fullName.split(" ")[0]}. We&apos;ll call to confirm within 1 business hour.
              </p>
            </div>

            <dl className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm bg-muted/40 rounded-lg p-5 border border-border">
              <div>
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium text-foreground mt-0.5">{fullName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Service</dt>
                <dd className="font-medium text-foreground mt-0.5">{serviceLabel(service)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-medium text-foreground mt-0.5">{format(selectedDate, "EEEE, MMM d")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Time</dt>
                <dd className="font-medium text-foreground mt-0.5">{selectedSlot}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium text-foreground mt-0.5">{phone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium text-foreground mt-0.5 break-all">{email}</dd>
              </div>
            </dl>

            <div className="mt-6 text-center">
              <Button
                className="rounded-lg"
                onClick={() => {
                  setSubmitted(false);
                  setFullName("");
                  setPhone("");
                  setEmail("");
                  setService("");
                  setSelectedSlot(null);
                  setNameError(null);
                  setEmailError(null);
                  setPhoneError(null);
                  setServiceError(null);
                  setSlotError(null);
                }}
              >
                Book Another
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-28 bg-surface" aria-labelledby="booking-heading">
      <div className="container">
        <div className="text-center mb-12">
          <h2 id="booking-heading" className="text-3xl md:text-4xl font-bold text-foreground">
            Book Your Appointment
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Choose a convenient time — we&apos;ll handle the rest.
          </p>
          <p className="mt-2 text-sm text-accent font-medium">Book ahead — slots fill quickly</p>
        </div>

        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
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
              <Label id={mobileDateLabelId} className="mb-2 block">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start rounded-lg min-h-[44px]"
                    aria-labelledby={mobileDateLabelId}
                  >
                    <CalendarIcon className="me-2 w-4 h-4 shrink-0" aria-hidden />
                    {format(selectedDate, "EEEE, MMM d")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleMobileDateSelect}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Desktop 5-day header */}
            <div className="hidden lg:block mb-4">
              <span id={weekStripLabelId} className="sr-only">
                Choose a day this week
              </span>
              <div className="grid grid-cols-5 gap-2" role="group" aria-labelledby={weekStripLabelId}>
                {weekDays.map((day, i) => (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => {
                      setSelectedDate(startOfDay(day));
                      setSelectedSlot(null);
                    }}
                    className={cn(
                      "p-3 rounded-lg text-center transition-all border",
                      isSameDay(selectedDate, day)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/40 text-foreground"
                    )}
                  >
                    <div className="text-xs font-medium opacity-70">{format(day, "EEE")}</div>
                    <div className="text-lg font-bold">{format(day, "d")}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slots grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {slots.map((slot, i) => (
                <button
                  key={`${slot.time}-${i}`}
                  type="button"
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
                  <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden />
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
              noValidate
            >
              <h3 className="text-lg font-semibold text-foreground">Your Details</h3>

              <div className="space-y-2">
                <Label htmlFor={nameId}>Full name</Label>
                <Input
                  id={nameId}
                  name="fullName"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  required
                  aria-invalid={nameError ? true : undefined}
                  aria-describedby={nameError ? `${nameId}-error` : undefined}
                  className="rounded-lg min-h-[44px]"
                />
                {nameError ? (
                  <p id={`${nameId}-error`} className="text-sm text-destructive" role="alert">
                    {nameError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={phoneId}>Phone number</Label>
                <Input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) validatePhoneField(e.target.value);
                  }}
                  onBlur={() => validatePhoneField(phone)}
                  required
                  aria-invalid={phoneError ? true : undefined}
                  aria-describedby={phoneError ? `${phoneId}-error` : undefined}
                  className="rounded-lg min-h-[44px]"
                />
                {phoneError ? (
                  <p id={`${phoneId}-error`} className="text-sm text-destructive" role="alert">
                    {phoneError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={emailId}>Email address</Label>
                <Input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmailField(e.target.value);
                  }}
                  onBlur={() => validateEmailField(email)}
                  required
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={emailError ? `${emailId}-error` : undefined}
                  className="rounded-lg min-h-[44px]"
                />
                {emailError ? (
                  <p id={`${emailId}-error`} className="text-sm text-destructive" role="alert">
                    {emailError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={serviceId}>Service</Label>
                <Select
                  value={service === "" ? undefined : service}
                  onValueChange={(v) => {
                    setService(v as ServiceValue);
                    setServiceError(null);
                  }}
                >
                  <SelectTrigger
                    id={serviceId}
                    className="rounded-lg min-h-[44px]"
                    aria-invalid={serviceError ? true : undefined}
                    aria-describedby={serviceError ? `${serviceId}-error` : undefined}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {serviceError ? (
                  <p id={`${serviceId}-error`} className="text-sm text-destructive" role="alert">
                    {serviceError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={timeId}>Preferred time</Label>
                <Input
                  id={timeId}
                  readOnly
                  tabIndex={-1}
                  value={selectedSlot ? selectedSlot : ""}
                  placeholder="Select a time slot on the left"
                  className="rounded-lg min-h-[44px] bg-muted"
                  aria-readonly="true"
                />
              </div>

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
