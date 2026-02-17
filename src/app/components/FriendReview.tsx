import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Users, Send, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { useState } from 'react';

interface FriendReviewProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  productName: string;
  productPrice: number;
}

interface FriendVote {
  name: string;
  vote: 'yes' | 'no';
  comment?: string;
}

export function FriendReview({
  isOpen,
  onClose,
  productImage,
  productName,
  productPrice,
}: FriendReviewProps) {
  const [friendEmail, setFriendEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [votes, setVotes] = useState<FriendVote[]>([
    { name: 'Sarah M.', vote: 'yes', comment: 'Love it! The color is perfect for you! 💕' },
    { name: 'Mike R.', vote: 'yes', comment: 'Looks great! Go for it!' },
    { name: 'Emma L.', vote: 'no', comment: 'Maybe try the blue one instead?' },
  ]);

  const handleSend = () => {
    if (friendEmail.trim()) {
      setSent(true);
      setFriendEmail('');
      setTimeout(() => setSent(false), 3000);
    }
  };

  const yesVotes = votes.filter((v) => v.vote === 'yes').length;
  const noVotes = votes.filter((v) => v.vote === 'no').length;
  const totalVotes = votes.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="friend-review-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Friend Review Mode
          </DialogTitle>
          <p id="friend-review-description" className="sr-only">
            Share products with friends and get their opinions before buying
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Product Preview */}
            <div className="space-y-3">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg">{productName}</h3>
                <p className="text-2xl text-purple-600">${productPrice}</p>
              </div>
            </div>

            {/* Share Section */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
                <h3 className="text-sm mb-3 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share with Friends
                </h3>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {sent && (
                  <p className="text-xs text-green-600 mt-2">✓ Sent! Waiting for response...</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Friends can vote Yes/No and leave comments
                </p>
              </div>

              {/* Vote Results */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-sm mb-3">Vote Results</h3>
                <div className="flex gap-4 mb-3">
                  <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                    <ThumbsUp className="w-6 h-6 mx-auto mb-1 text-green-600" />
                    <p className="text-2xl text-green-600">{yesVotes}</p>
                    <p className="text-xs text-gray-600">Yes</p>
                  </div>
                  <div className="flex-1 bg-red-50 rounded-lg p-3 text-center">
                    <ThumbsDown className="w-6 h-6 mx-auto mb-1 text-red-600" />
                    <p className="text-2xl text-red-600">{noVotes}</p>
                    <p className="text-xs text-gray-600">No</p>
                  </div>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
                    style={{ width: `${(yesVotes / totalVotes) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-600 mt-2">
                  {Math.round((yesVotes / totalVotes) * 100)}% approval rate
                </p>
              </div>
            </div>
          </div>

          {/* Friend Comments */}
          <div className="border-t pt-4">
            <h3 className="text-sm mb-3">Friend Comments</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {votes.map((vote, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      vote.vote === 'yes' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {vote.vote === 'yes' ? (
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>{vote.name}</strong>{' '}
                      <span
                        className={
                          vote.vote === 'yes' ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        voted {vote.vote.toUpperCase()}
                      </span>
                    </p>
                    {vote.comment && (
                      <p className="text-sm text-gray-600 mt-1">{vote.comment}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Maybe Later
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Friends Love It! Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}