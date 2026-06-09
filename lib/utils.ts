import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function generateWhatsAppMessage(nome: string, hora: string, data: string): string {
  return encodeURIComponent(
    `Olá, ${nome}! 🙏\n\nSeu horário de oração foi confirmado.\n\n` +
    `📅 Data: ${data}\n⏰ Horário: ${hora}\n\n` +
    `Obrigado por fazer parte da Rede de Oração Kerigma.\n\n` +
    `_Anunciar. Amar. Acolher. Cuidar._\n\n` +
    `*KERIGMA 24H — Assembleia de Deus Jardim Del Rey*`
  );
}

export function sendWhatsApp(phone: string, message: string): void {
  const digits = phone.replace(/\D/g, '');
  const number = digits.startsWith('55') ? digits : `55${digits}`;
  window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}

export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export function createArcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  gap = 1.5
): string {
  const s = startAngle + gap;
  const e = endAngle - gap;
  const p1 = polarToCartesian(cx, cy, outerR, s);
  const p2 = polarToCartesian(cx, cy, outerR, e);
  const p3 = polarToCartesian(cx, cy, innerR, e);
  const p4 = polarToCartesian(cx, cy, innerR, s);
  const largeArc = e - s > 180 ? 1 : 0;
  return [
    `M ${p1.x.toFixed(3)} ${p1.y.toFixed(3)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x.toFixed(3)} ${p2.y.toFixed(3)}`,
    `L ${p3.x.toFixed(3)} ${p3.y.toFixed(3)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x.toFixed(3)} ${p4.y.toFixed(3)}`,
    'Z',
  ].join(' ');
}

export function getSlotColor(status: string): string {
  switch (status) {
    case 'coberto': return '#0057FF';
    case 'urgente': return '#FF3B30';
    case 'selecionado': return '#FF6A00';
    default: return 'rgba(255,255,255,0.12)';
  }
}

export function getSlotGlow(status: string): string {
  switch (status) {
    case 'coberto': return 'url(#glow-blue)';
    case 'urgente': return 'url(#glow-red)';
    case 'selecionado': return 'url(#glow-orange)';
    default: return 'none';
  }
}

export const HORAS_DO_DIA = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});
