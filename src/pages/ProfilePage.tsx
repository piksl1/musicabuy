
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import RequireAuth from '@/components/RequireAuth';

interface Profile {
  username: string | null;
  avatar_url: string | null;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({ username: null, avatar_url: null });
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile(data);
        setUsername(data.username || '');
      }
    } catch (error: any) {
      console.error('Error loading user data:', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user?.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Profile updated!',
        description: 'Your profile has been updated successfully.',
      });
      
      getProfile();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <RequireAuth>
      <Layout>
        <div className="container mx-auto py-12 max-w-lg">
          <div className="bg-card shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={user?.email || ''}
                  disabled
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={updateProfile} 
                disabled={loading || !username}
                className="w-full"
              >
                {loading ? 'Saving...' : 'Update Profile'}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  );
};

export default ProfilePage;
