import React from 'react';
import { PageLayout } from '../../components/PageLayout';
import { useParams } from 'react-router-dom';

export function Room() {
  const { roomId: string } = useParams<{ roomId: string }>();

  return <PageLayout>test</PageLayout>;
}
