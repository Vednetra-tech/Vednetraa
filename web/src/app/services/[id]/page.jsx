import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findService } from '../../../lib/services.js';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await findService(id);
  if (!service) {
    return { title: 'Service not found | VedNetra' };
  }
  return {
    title: `${service.title} | VedNetra`,
    description: service.description,
    alternates: { canonical: `https://vednetra.com/services/${service.id}` },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  const service = await findService(id);
  if (!service) {
    notFound();
  }

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '6rem 1.5rem' }}>
      <nav aria-label="breadcrumb">
        <Link href="/">Home</Link>
      </nav>
      <h1>{service.title}</h1>
      {service.title_en && <p><em>{service.title_en}</em></p>}
      <p>{service.description}</p>
      {service.duration && <p><strong>Duration:</strong> {service.duration}</p>}
      {service.significance && <p>{service.significance}</p>}
      {Array.isArray(service.modes) && service.modes.length > 0 && (
        <p><strong>Modes:</strong> {service.modes.join(', ')}</p>
      )}
      <Link href={`/?book=${service.id}`}>Book this service</Link>
    </main>
  );
}
