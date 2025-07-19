import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Shield } from "lucide-react";
import { Link } from "wouter";

interface AssetLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: "free" | "pro" | "plus" | "enterprise";
  currentAssets: number;
  maxAssets: number;
}

const PLAN_UPGRADES = {
  free: {
    next: "pro",
    nextLimit: 10,
    price: "R$ 79,90/mês"
  },
  pro: {
    next: "plus", 
    nextLimit: 50,
    price: "R$ 229,90/mês"
  },
  plus: {
    next: "enterprise",
    nextLimit: "ilimitados",
    price: "R$ 2.499+/mês"
  }
};

export default function AssetLimitModal({ isOpen, onClose, currentPlan, currentAssets, maxAssets }: AssetLimitModalProps) {
  const upgrade = PLAN_UPGRADES[currentPlan];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <DialogTitle className="text-xl text-center">
            Limite de Ativos Atingido
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Você atingiu o limite de {maxAssets} ativos do plano {currentPlan.toUpperCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Usage */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Uso Atual</span>
              <Badge variant="outline" className="text-orange-400 border-orange-400">
                {currentAssets}/{maxAssets} ativos
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (currentAssets / maxAssets) * 100)}%` }}
              />
            </div>
          </div>

          {/* Upgrade Suggestion */}
          {upgrade && (
            <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">
                    Upgrade para {upgrade.next.toUpperCase()}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Monitore até {upgrade.nextLimit} ativos por {upgrade.price}
                  </p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• IA real para detecção avançada</li>
                    <li>• Simulações de ataques</li>
                    <li>• Relatórios de compliance</li>
                    <li>• Suporte prioritário</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Current Plan Benefits */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-400 mb-1">
                  Plano {currentPlan.toUpperCase()} Atual
                </h4>
                <p className="text-sm text-gray-300">
                  Você ainda pode utilizar todos os recursos disponíveis em seus {maxAssets} ativos atuais.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Continuar com Plano Atual
          </Button>
          {upgrade && (
            <Link href="/plans">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Fazer Upgrade Agora
              </Button>
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}