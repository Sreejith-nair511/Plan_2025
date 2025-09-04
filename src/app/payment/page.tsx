"use client"

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Navbar } from '@/components/navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Target, TrendingUp, Star } from 'lucide-react'

declare global {
  interface Window {
    Razorpay: any
  }
}

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Unlimited Quizzes",
    description: "Access unlimited AI-generated quizzes across all topics"
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: "Advanced Analytics",
    description: "Detailed performance insights and progress tracking"
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Personalized Learning",
    description: "AI-powered recommendations based on your performance"
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Priority Support",
    description: "Get priority customer support and feature requests"
  }
]

export default function PaymentPage() {
  const { userId } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    if (!userId) return

    setIsLoading(true)

    try {
      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: 4900, // ₹49 in paise
          currency: 'INR',
          name: 'Placement Prep Buddy',
          description: 'Premium Subscription - Monthly',
          image: '/logo.png',
          handler: function (response: any) {
            console.log('Payment successful:', response)
            // Handle successful payment
            alert('Payment successful! Welcome to Premium!')
          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9999999999'
          },
          notes: {
            userId: userId
          },
          theme: {
            color: '#3b82f6'
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Crown className="h-4 w-4" />
              <span>Upgrade to Premium</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unlock Your Full Potential
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get unlimited access to AI-powered quizzes, advanced analytics, and personalized learning paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Free Plan</span>
                  <Badge variant="outline">Current</Badge>
                </CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">₹0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">5 quizzes per day</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic progress tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Access to leaderboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Interview experiences</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-primary shadow-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <span>Premium Plan</span>
                </CardTitle>
                <CardDescription>Everything you need to succeed</CardDescription>
                <div className="text-3xl font-bold">₹49<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Everything in Free</span>
                  </div>
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-primary mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="text-sm font-medium">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Upgrade to Premium'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription anytime. You'll continue to have premium access until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  You can use our free plan indefinitely with limited features. Upgrade to premium for unlimited access.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
