'use client';

import { useEffect, useState } from 'react';

function parseValue(value) {
  const text = String(value);
  const match = text.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);

  if (!match) return null;

  const numberText = match[2].replace(/,/g, '');
  const target = Number(numberText);

  if (!Number.isFinite(target)) return null;

  return {
    prefix: match[1],
    suffix: match[3],
    target,
    fractionDigits: numberText.split('.')[1]?.length || 0,
  };
}

export default function AnimatedStat({ value }) {
  const parsed = parseValue(value);
  const [count, setCount] = useState(parsed ? Math.min(1, parsed.target) : 0);

  useEffect(() => {
    if (!parsed) return;

    const start = Math.min(1, parsed.target);
    const duration = 1400;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(parsed.target);
      return;
    }

    let startTime;
    let frameId;

    function animate(timestamp) {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(start + (parsed.target - start) * easedProgress);

      if (progress < 1) frameId = requestAnimationFrame(animate);
    }

    setCount(start);
    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value]);

  if (!parsed) return value;

  const formattedCount = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: parsed.fractionDigits,
    minimumFractionDigits: parsed.fractionDigits,
  }).format(count);

  return (
    <strong aria-label={String(value)}>
      {parsed.prefix}{formattedCount}{parsed.suffix}
    </strong>
  );
}