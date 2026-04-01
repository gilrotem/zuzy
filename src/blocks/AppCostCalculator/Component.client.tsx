'use client'
import React, { useState, useMemo } from 'react'

type AppType = 'landing' | 'business' | 'ecommerce' | 'saas' | 'marketplace'
type DesignLevel = 'basic' | 'custom' | 'premium'
type Feature = {
  id: string
  label: string
  cost: number
  hours: number
}

const APP_TYPES: { value: AppType; label: string; baseCost: number; baseHours: number }[] = [
  { value: 'landing', label: 'דף נחיתה / אתר תדמית', baseCost: 8000, baseHours: 40 },
  { value: 'business', label: 'אפליקציית עסק (CRM / ניהול)', baseCost: 35000, baseHours: 200 },
  { value: 'ecommerce', label: 'חנות אונליין (E-Commerce)', baseCost: 45000, baseHours: 280 },
  { value: 'saas', label: 'מוצר SaaS', baseCost: 80000, baseHours: 500 },
  { value: 'marketplace', label: 'מרקטפלייס (דו-צדדי)', baseCost: 120000, baseHours: 700 },
]

const DESIGN_LEVELS: {
  value: DesignLevel
  label: string
  multiplier: number
  description: string
}[] = [
  { value: 'basic', label: 'בסיסי', multiplier: 1.0, description: 'תבנית מוכנה עם התאמות' },
  { value: 'custom', label: 'מותאם אישית', multiplier: 1.4, description: 'עיצוב ייחודי מאפס' },
  {
    value: 'premium',
    label: 'פרימיום',
    multiplier: 1.8,
    description: 'עיצוב יוקרתי + אנימציות + מיקרו-אינטראקציות',
  },
]

const FEATURES: Feature[] = [
  { id: 'auth', label: 'מערכת הרשמה והתחברות', cost: 5000, hours: 30 },
  { id: 'payments', label: 'תשלומים וסליקה', cost: 8000, hours: 45 },
  { id: 'dashboard', label: 'דשבורד ניהול', cost: 12000, hours: 70 },
  { id: 'notifications', label: 'התראות (Push / Email / SMS)', cost: 6000, hours: 35 },
  { id: 'chat', label: "צ'אט / הודעות בזמן אמת", cost: 10000, hours: 60 },
  { id: 'search', label: 'חיפוש מתקדם + פילטרים', cost: 7000, hours: 40 },
  { id: 'analytics', label: 'אנליטיקס ודוחות', cost: 9000, hours: 50 },
  { id: 'multilang', label: 'תמיכה רב-לשונית', cost: 6000, hours: 35 },
  { id: 'api', label: 'API חיצוני (אינטגרציות)', cost: 8000, hours: 45 },
  { id: 'mobile', label: 'אפליקציית מובייל (iOS + Android)', cost: 25000, hours: 150 },
]

const HOURLY_RATE = 180 // ₪ per hour

interface Props {
  title?: string | null
  subtitle?: string | null
  ctaText?: string | null
  ctaLink?: string | null
}

export const AppCostCalculatorClient: React.FC<Props> = ({
  title = 'כמה יעלה לפתח את האפליקציה שלך?',
  subtitle = 'קבל הערכת עלות מיידית על בסיס הדרישות שלך',
  ctaText = 'רוצה הצעת מחיר מדויקת? דבר איתנו',
  ctaLink = '/contact',
}) => {
  const [appType, setAppType] = useState<AppType>('landing')
  const [designLevel, setDesignLevel] = useState<DesignLevel>('basic')
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const calculation = useMemo(() => {
    const app = APP_TYPES.find((a) => a.value === appType)!
    const design = DESIGN_LEVELS.find((d) => d.value === designLevel)!
    const featuresData = FEATURES.filter((f) => selectedFeatures.includes(f.id))

    const featuresCost = featuresData.reduce((sum, f) => sum + f.cost, 0)
    const featuresHours = featuresData.reduce((sum, f) => sum + f.hours, 0)

    const rawCost = (app.baseCost + featuresCost) * design.multiplier
    const totalHours = Math.round((app.baseHours + featuresHours) * design.multiplier)
    const totalCost = Math.round(rawCost / 1000) * 1000
    const timeline = Math.round(totalHours / 160) // months (160 hours/month)

    return {
      totalCost,
      totalHours,
      timeline: Math.max(timeline, 1),
      hourlyEquivalent: Math.round(totalCost / totalHours),
    }
  }, [appType, designLevel, selectedFeatures])

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0,
    }).format(num)

  return (
    <div className="container my-16" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          {subtitle && <p className="text-lg text-gray-500">{subtitle}</p>}
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Inputs */}
          <div className="md:col-span-3 space-y-8">
            {/* App Type */}
            <div>
              <h3 className="text-lg font-semibold mb-3">סוג הפרויקט</h3>
              <div className="space-y-2">
                {APP_TYPES.map((type) => (
                  <label
                    key={type.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      appType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="appType"
                      value={type.value}
                      checked={appType === type.value}
                      onChange={() => setAppType(type.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        appType === type.value ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    >
                      {appType === type.value && (
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <span className="font-medium">{type.label}</span>
                    <span className="text-sm text-gray-400 mr-auto">
                      מ-{formatCurrency(type.baseCost)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Design Level */}
            <div>
              <h3 className="text-lg font-semibold mb-3">רמת עיצוב</h3>
              <div className="grid grid-cols-3 gap-3">
                {DESIGN_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setDesignLevel(level.value)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      designLevel === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-bold mb-1">{level.label}</div>
                    <div className="text-xs text-gray-500">{level.description}</div>
                    <div className="text-sm font-medium text-blue-600 mt-2">
                      x{level.multiplier}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                פיצ׳רים נוספים
                <span className="text-sm font-normal text-gray-400 mr-2">
                  ({selectedFeatures.length} נבחרו)
                </span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {FEATURES.map((feature) => (
                  <label
                    key={feature.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature.id)}
                      onChange={() => toggleFeature(feature.id)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span>{feature.label}</span>
                    <span className="text-gray-400 mr-auto">+{formatCurrency(feature.cost)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="md:col-span-2">
            <div className="sticky top-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg font-medium mb-6 text-gray-300">הערכת עלות</h3>

              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-2">
                  {formatCurrency(calculation.totalCost)}
                </div>
                <div className="text-gray-400 text-sm">הערכה כוללת (לפני מע״מ)</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">שעות עבודה</span>
                  <span className="font-medium">{calculation.totalHours} שעות</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">לו״ז משוער</span>
                  <span className="font-medium">
                    {calculation.timeline} {calculation.timeline === 1 ? 'חודש' : 'חודשים'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400">עלות לשעה (ממוצע)</span>
                  <span className="font-medium">
                    {formatCurrency(calculation.hourlyEquivalent)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4 mb-6 text-sm text-gray-300">
                💡 ההערכה מבוססת על תעריפי שוק ממוצעים בישראל. העלות הסופית תלויה בדרישות מדויקות,
                מורכבות טכנית, ולוח זמנים.
              </div>

              <a
                href={ctaLink || '/support/contact'}
                className="block w-full text-center py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
              >
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
