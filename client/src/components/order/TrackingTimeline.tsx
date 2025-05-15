import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Truck,
  PackageCheck,
  Box,
  CheckCheck,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Tracking status types
export type TrackingStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Tracking item interface
export interface TrackingItem {
  id: number;
  status: TrackingStatus;
  orderId: number;
  updatedAt: Date | string | null;
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDelivery: Date | string | null;
  actualDelivery: Date | string | null;
  locationUpdate: string | null;
  notes: string | null;
}

// Props interface
interface TrackingTimelineProps {
  trackingHistory: TrackingItem[];
  currentStatus: TrackingStatus;
}

export default function TrackingTimeline({ trackingHistory, currentStatus }: TrackingTimelineProps) {
  const { t } = useTranslation();
  const [sortedHistory, setSortedHistory] = useState<TrackingItem[]>([]);
  
  // Sort tracking history by date
  useEffect(() => {
    const sorted = [...trackingHistory].sort((a, b) => {
      const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return dateB - dateA; // descending order (newest first)
    });
    setSortedHistory(sorted);
  }, [trackingHistory]);
  
  // Status steps in order
  const statusSteps: TrackingStatus[] = ['pending', 'processing', 'shipped', 'delivered'];
  
  // Status info mapping
  const statusInfo = {
    pending: {
      title: t('Order Placed'),
      description: t('Your order has been received and payment confirmed.'),
      icon: Clock,
      color: 'text-orange-500',
      badge: 'bg-orange-100 text-orange-800'
    },
    processing: {
      title: t('Processing'),
      description: t('Your order is being prepared and packed.'),
      icon: Box,
      color: 'text-blue-500',
      badge: 'bg-blue-100 text-blue-800'
    },
    shipped: {
      title: t('Shipped'),
      description: t('Your order is on its way to you.'),
      icon: Truck,
      color: 'text-purple-500',
      badge: 'bg-purple-100 text-purple-800'
    },
    delivered: {
      title: t('Delivered'),
      description: t('Your order has been delivered successfully.'),
      icon: CheckCheck,
      color: 'text-green-500',
      badge: 'bg-green-100 text-green-800'
    },
    cancelled: {
      title: t('Cancelled'),
      description: t('Your order has been cancelled.'),
      icon: AlertCircle,
      color: 'text-red-500',
      badge: 'bg-red-100 text-red-800'
    }
  };
  
  // Format date
  const formatDate = (date: Date | string | null) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return '';
    }
  };
  
  // Check if a step is completed
  const isStepCompleted = (step: TrackingStatus) => {
    if (currentStatus === 'cancelled') return false;
    
    const stepIndex = statusSteps.indexOf(step);
    const currentIndex = statusSteps.indexOf(currentStatus);
    
    return stepIndex <= currentIndex;
  };
  
  // Check if a step is current
  const isCurrentStep = (step: TrackingStatus) => {
    return step === currentStatus;
  };
  
  return (
    <div className="w-full">
      {/* Status Timeline */}
      <div className="mb-8 relative flex justify-between items-start">
        {statusSteps.map((step, index) => {
          const isCompleted = isStepCompleted(step);
          const isCurrent = isCurrentStep(step);
          const StepIcon = statusInfo[step].icon;
          
          return (
            <div 
              key={step} 
              className={`flex flex-col items-center ${index === 0 ? 'text-start' : index === statusSteps.length - 1 ? 'text-end' : 'text-center'} relative z-10`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? statusInfo[step].color : 'bg-gray-200 text-gray-400'} ${isCurrent ? 'ring-4 ring-offset-2 ring-offset-white ring-primary/30' : ''}`}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              <div className="mt-2 space-y-1">
                <p className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                  {statusInfo[step].title}
                </p>
                {isCurrent && (
                  <p className="text-xs text-gray-500 max-w-[120px]">
                    {statusInfo[step].description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Connecting lines */}
        <div className="absolute top-5 left-0 right-0 h-0.5 -translate-y-1/2 z-0">
          <div className="absolute inset-0 bg-gray-200"></div>
          <div 
            className={`absolute inset-y-0 left-0 bg-primary transition-all duration-500`}
            style={{ 
              width: currentStatus === 'cancelled' 
                ? '0%' 
                : `${(statusSteps.indexOf(currentStatus) / (statusSteps.length - 1)) * 100}%` 
            }}
          ></div>
        </div>
      </div>
      
      {/* Current Status Badge */}
      <div className="flex justify-center mb-6">
        <Badge 
          className={`px-3 py-1 text-sm ${statusInfo[currentStatus].badge}`}
        >
          {statusInfo[currentStatus].title}
        </Badge>
      </div>
      
      {/* Tracking Details */}
      {currentStatus === 'shipped' && sortedHistory.find(item => item.status === 'shipped') && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-sm font-semibold mb-2">{t('Shipping Details')}</h3>
          {sortedHistory.find(item => item.status === 'shipped' && item.carrier) && (
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">{t('Carrier')}:</span>
              <span>{sortedHistory.find(item => item.status === 'shipped')?.carrier}</span>
              
              <span className="text-gray-500">{t('Tracking Number')}:</span>
              <span>{sortedHistory.find(item => item.status === 'shipped')?.trackingNumber}</span>
              
              {sortedHistory.find(item => item.status === 'shipped')?.estimatedDelivery && (
                <>
                  <span className="text-gray-500">{t('Estimated Delivery')}:</span>
                  <span>{formatDate(sortedHistory.find(item => item.status === 'shipped')?.estimatedDelivery || '')}</span>
                </>
              )}
              
              {sortedHistory.find(item => item.status === 'shipped')?.locationUpdate && (
                <>
                  <span className="text-gray-500">{t('Last Location')}:</span>
                  <span>{sortedHistory.find(item => item.status === 'shipped')?.locationUpdate}</span>
                </>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Tracking History */}
      <div className="border rounded-lg overflow-hidden">
        <h3 className="text-sm font-semibold p-4 bg-gray-50 border-b">{t('Tracking History')}</h3>
        <div className="divide-y">
          {sortedHistory.length > 0 ? (
            sortedHistory.map((item) => {
              const StatusIcon = statusInfo[item.status].icon;
              
              return (
                <div key={item.id} className="p-4 flex items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${statusInfo[item.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <p className="font-medium">{statusInfo[item.status].title}</p>
                      <p className="text-sm text-gray-500">{formatDate(item.updatedAt)}</p>
                    </div>
                    {item.notes && <p className="text-sm text-gray-600">{item.notes}</p>}
                    {item.locationUpdate && item.status === 'shipped' && (
                      <p className="text-sm text-gray-600 mt-1">
                        {t('Location')}: {item.locationUpdate}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-4 text-sm text-gray-500">{t('No tracking information available yet.')}</p>
          )}
        </div>
      </div>
    </div>
  );
}