import { useState } from 'react';
import { UserCheck, UserPlus } from 'lucide-react';
import LoginModal from './LoginModal';

interface EventAttendButtonProps {
  eventId: string;
  isAttending: boolean;
  isAuthenticated: boolean;
  onAttendToggle?: () => void;
}

export default function EventAttendButton({
  eventId,
  isAttending,
  isAuthenticated,
  onAttendToggle,
}: EventAttendButtonProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // User is authenticated, toggle attendance
    setIsLoading(true);
    try {
      const apiUrl =
        import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

      const response = await fetch(`${apiUrl}/events/${eventId}/attending`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al marcar asistencia');
      }

      // Reload page to update attendance status
      if (onAttendToggle) {
        onAttendToggle();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error toggling attendance:', error);
      alert('Error al marcar asistencia. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isAttending
            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
            : 'bg-church-blue text-white hover:bg-church-deep-blue'
        }`}
      >
        {isAttending ? (
          <>
            <UserCheck className="w-5 h-5" />
            Asistiré
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            {isLoading ? 'Marcando...' : 'Marcar Asistencia'}
          </>
        )}
      </button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        redirectTo={`/events#event-${eventId}`}
      />
    </>
  );
}
