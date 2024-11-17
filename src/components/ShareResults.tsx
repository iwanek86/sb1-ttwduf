import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Send } from 'lucide-react';

interface ShareResultsProps {
  title: string;
  text: string;
  url?: string;
}

export function ShareResults({ title, text, url = window.location.href }: ShareResultsProps) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877F2] hover:bg-[#0d6efd]'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
      color: 'bg-[#0A66C2] hover:bg-[#084d93]'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-[#25D366] hover:bg-[#1da84d]'
    },
    {
      name: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-[#0088cc] hover:bg-[#006699]'
    }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Share Results</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors ${link.color}`}
            onClick={(e) => {
              e.preventDefault();
              window.open(link.url, '_blank', 'width=600,height=400');
            }}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
        
        {navigator.share && (
          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
}