import React from 'react';
import { FileText, Calendar, ClipboardList, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function CleaningProcess() {
  const steps = [
    {
      stepNumber: 1,
      icon: FileText,
      title: 'Fill Our Form',
      description: 'Complete our quick online enquiry form with your space details and preferred schedule.'
    },
    {
      stepNumber: 2,
      icon: Calendar,
      title: 'Book Appointment',
      description: 'Schedule your service online or reach our team at your preferred date and time.'
    },
    {
      stepNumber: 3,
      icon: ClipboardList,
      title: 'Confirm Details',
      description: 'We align on your specific room priorities, custom requests, and property layout.'
    },
    {
      stepNumber: 4,
      icon: Sparkles,
      title: 'We Clean',
      description: 'Our vetted specialists arrive equipped with commercial-grade tools and premium solutions.'
    },
    {
      stepNumber: 5,
      icon: CheckCircle2,
      title: 'You Enjoy',
      description: 'Relax and unwind in a beautifully sanitized, fresh, and spotless environment.'
    }
  ];

  return (
    <section id="process" className="process-section" aria-label="Our Cleaning Process">
      <div className="container">
        <SectionHeading
          eyebrow="OUR CLEANING PROCESS"
          title="Simple Steps. Spotless Results."
          subtitle="Our streamlined five-stage process guarantees transparent communication, seamless coordination, and reliable service from start to finish."
          align="center"
        />

        <div className="process-steps-wrapper">
          {steps.map((step, index) => {
            const IconComp = step.icon;
            const hasNext = index < steps.length - 1;

            return (
              <div key={step.stepNumber} className="process-step-item">
                <span className="process-badge-number">{step.stepNumber}</span>
                <div className="process-icon-box" aria-hidden="true">
                  <IconComp size={30} />
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.description}</p>

                {hasNext && (
                  <div className="process-connector-arrow" aria-hidden="true">
                    <ArrowRight size={22} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

