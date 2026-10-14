import {
  Activity, ArrowRight, ArrowUpRight, Baby, BarChart3, BookOpen, Box, Brain, Briefcase,
  Building2, Cable, Check, ChevronRight, ClipboardCheck, Clock, Compass, Copy, Cpu,
  Crosshair, Eraser, Eye, FileText, FlaskConical, Flame, Gauge, GitBranch, Globe,
  GraduationCap, HeartPulse, HelpCircle, History, Hourglass, Image as ImageIcon,
  Landmark, Layers, LayoutTemplate, Lightbulb, Linkedin, ListChecks, Mail, Map,
  Megaphone, MessageCircle, MessagesSquare, Mic, Microscope, Network, Palette,
  PencilRuler, Presentation, Quote, Repeat, RotateCcw, Rocket, Route, Scale, Search,
  Server, Shuffle, ShieldAlert, Sparkles, Star, StickyNote, Swords, Table2, Target,
  Telescope, TrendingUp, Users, Wand2, Workflow, Zap, type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  Activity, ArrowRight, ArrowUpRight, Baby, BarChart3, BookOpen, Box, Brain, Briefcase,
  Building2, Cable, Check, ChevronRight, ClipboardCheck, Clock, Compass, Copy, Cpu,
  Crosshair, Eraser, Eye, FileText, FlaskConical, Flame, Gauge, GitBranch, Globe,
  GraduationCap, HeartPulse, HelpCircle, History, Hourglass, ImageIcon, Landmark,
  Layers, LayoutTemplate, Lightbulb, Linkedin, ListChecks, Mail, Map, Megaphone,
  MessageCircle, MessagesSquare, Mic, Microscope, Network, Palette, PencilRuler,
  Presentation, Quote, Repeat, RotateCcw, Rocket, Route, Scale, Search, Server,
  Shuffle, ShieldAlert, Sparkles, Star, StickyNote, Swords, Table2, Target, Telescope,
  TrendingUp, Users, Wand2, Workflow, Zap,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
