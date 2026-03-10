'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { INGENIERIA } from '@/lib/constants';
import { useIsMobile } from '@/lib/useMediaQuery';
import { fadeInUp } from '@/lib/animations';

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const steps = INGENIERIA.processSteps;
  const stepCount = steps.length;

  // Update active step based on scroll
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const stepIdx = Math.min(Math.floor(v * stepCount), stepCount - 1);
    setActiveStep(Math.max(0, stepIdx));

    // Update SVG path
    if (pathRef.current && pathLength > 0) {
      const drawLength = pathLength * (1 - v);
      pathRef.current.style.strokeDasharray = `${pathLength}`;
      pathRef.current.style.strokeDashoffset = `${Math.max(0, drawLength)}`;
    }
  });

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative py-16">
        {/* Vertical timeline for mobile */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <svg
            className="absolute left-3 top-0 w-2 h-full"
            viewBox="0 0 2 1000"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M1 0 L1 1000"
              stroke="#3A4F6A"
              strokeWidth="1"
              fill="none"
            />
          </svg>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative mb-12 last:mb-0"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Node dot */}
              <div
                className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300"
                style={{
                  borderColor: '#3A4F6A',
                  backgroundColor: activeStep >= i ? '#3A4F6A' : 'transparent',
                }}
              />

              <div>
                <p className="font-ingeniero text-[11px] tracking-[0.3em] uppercase" style={{ color: '#3A4F6A' }}>
                  {step.label}
                </p>
                <p className="font-body text-sm mt-2" style={{ color: '#3A4F6A', opacity: 0.7 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop: Horizontal timeline
  const svgWidth = 1200;
  const svgHeight = 120;
  const nodeSpacing = svgWidth / (stepCount - 1);

  // Build horizontal path through nodes
  const pathPoints = steps.map((_, i) => `${i * nodeSpacing} 60`);
  const pathD = `M ${pathPoints.join(' L ')}`;

  return (
    <div ref={containerRef} className="relative py-16 overflow-visible">
      <svg
        viewBox={`-20 0 ${svgWidth + 40} ${svgHeight}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background track */}
        <path
          d={pathD}
          stroke="#3A4F6A"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />

        {/* Animated path */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="#3A4F6A"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Nodes */}
        {steps.map((_, i) => {
          const cx = i * nodeSpacing;
          const isActive = activeStep >= i;
          const isCurrent = activeStep === i;

          return (
            <g key={i}>
              {/* Pulse ring on active */}
              {isCurrent && (
                <circle
                  cx={cx}
                  cy="60"
                  r="12"
                  fill="none"
                  stroke="#3A4F6A"
                  strokeWidth="0.5"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    values="8;16;8"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.3;0;0.3"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Node circle */}
              <circle
                cx={cx}
                cy="60"
                r="6"
                fill={isActive ? '#3A4F6A' : 'transparent'}
                stroke="#3A4F6A"
                strokeWidth="1.5"
                style={{ transition: 'fill 0.3s ease' }}
              />
            </g>
          );
        })}
      </svg>

      {/* Labels below */}
      <div className="flex justify-between mt-6">
        {steps.map((step, i) => {
          const isCurrent = activeStep === i;
          const isActive = activeStep >= i;

          return (
            <div
              key={step.id}
              className="text-center flex-1 px-2 transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <p
                className="font-ingeniero text-[10px] md:text-[11px] tracking-[0.15em] uppercase"
                style={{ color: '#3A4F6A' }}
              >
                {step.label}
              </p>

              {/* Tooltip card for active step */}
              <motion.div
                className="mt-3 px-3 py-2 border border-[#3A4F6A]/20 rounded-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-body text-xs" style={{ color: '#3A4F6A', opacity: 0.7 }}>
                  {step.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
