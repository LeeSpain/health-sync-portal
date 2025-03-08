
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, UserCheck, X } from 'lucide-react';
import { Client } from '@/types/staff';

interface ClientConnectionProps {
  assignedClients: Client[];
  availableClients: Client[];
  onConnectClient: (clientId: string) => void;
  onDisconnectClient: (clientId: string) => void;
}

const ClientConnection: React.FC<ClientConnectionProps> = ({
  assignedClients,
  availableClients,
  onConnectClient,
  onDisconnectClient
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  
  const handleConnect = () => {
    if (!selectedClientId) {
      toast({
        title: "Error",
        description: "Please select a client to connect",
        variant: "destructive",
      });
      return;
    }
    
    onConnectClient(selectedClientId);
    setIsDialogOpen(false);
    setSelectedClientId("");
    
    toast({
      title: "Success",
      description: "Client connected successfully",
    });
  };
  
  const handleDisconnect = (clientId: string) => {
    onDisconnectClient(clientId);
    toast({
      title: "Success",
      description: "Client disconnected successfully",
    });
  };
  
  const filteredAvailableClients = availableClients.filter(client => 
    !assignedClients.some(assigned => assigned.id === client.id)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-xl">Connected Clients</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Connect Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect to a Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Select Client</Label>
                <Select 
                  value={selectedClientId} 
                  onValueChange={setSelectedClientId}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredAvailableClients.length > 0 ? (
                      filteredAvailableClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} - {client.careType}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No available clients</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConnect}>
                Connect
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {assignedClients.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {assignedClients.map((client) => (
            <div 
              key={client.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <img 
                  src={client.image} 
                  alt={client.name}
                  className="h-10 w-10 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {client.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {client.careType}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDisconnect(client.id)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <UserCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No connected clients</h3>
          <p className="text-gray-500 mb-6">Connect this staff member to clients to manage care.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect First Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect to a Client</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Select Client</Label>
                  <Select 
                    value={selectedClientId} 
                    onValueChange={setSelectedClientId}
                  >
                    <SelectTrigger id="client">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredAvailableClients.length > 0 ? (
                        filteredAvailableClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} - {client.careType}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>No available clients</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnect}>
                  Connect
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ClientConnection;
