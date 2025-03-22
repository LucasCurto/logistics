import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import {
  SalesData,
  SalesAuditResult,
  Product,
  Recipe,
  StockLocationType,
} from "@/types/inventory";
import {
  Plus,
  Search,
  FileDown,
  Filter,
  BarChart,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

// Mock data for sales
const salesData: SalesData[] = [
  {
    id: "s1",
    date: "2023-06-15T10:30:00Z",
    productId: "p1",
    productName: "Farinha (Uso Geral)",
    quantity: 5,
    unitPrice: 2.5,
    totalPrice: 12.5,
    stockLocation: "cozinha",
  },
  {
    id: "s2",
    date: "2023-06-15T11:45:00Z",
    productId: "p2",
    productName: "Açúcar (Granulado)",
    quantity: 3,
    unitPrice: 1.75,
    totalPrice: 5.25,
    stockLocation: "cozinha",
  },
  {
    id: "s3",
    date: "2023-06-15T13:15:00Z",
    productId: "p3",
    productName: "Gotas de Chocolate",
    quantity: 2,
    unitPrice: 4.25,
    totalPrice: 8.5,
    stockLocation: "cozinha",
  },
  {
    id: "s4",
    date: "2023-06-16T09:30:00Z",
    productId: "p4",
    productName: "Extrato de Baunilha",
    quantity: 1,
    unitPrice: 8.99,
    totalPrice: 8.99,
    stockLocation: "bar",
  },
  {
    id: "s5",
    date: "2023-06-16T14:00:00Z",
    productId: "p3",
    productName: "Gotas de Chocolate",
    quantity: 3,
    unitPrice: 4.25,
    totalPrice: 12.75,
    stockLocation: "cozinha",
    recipeId: "r1",
  },
];

// Mock data for products
const products: Product[] = [
  {
    id: "p1",
    name: "Farinha (Uso Geral)",
    sku: "FL-001",
    category: "Essenciais para Panificação",
    currentStock: 35,
    minStockLevel: 20,
    unitCost: 1.25,
    unitPrice: 2.5,
    supplierId: "s1",
    supplier: "Global Foods Supply",
    location: "Prateleira A1",
    stockLocation: "cozinha",
    lastUpdated: "2023-06-10T14:30:00Z",
  },
  {
    id: "p2",
    name: "Açúcar (Granulado)",
    sku: "SG-002",
    category: "Essenciais para Panificação",
    currentStock: 42,
    minStockLevel: 15,
    unitCost: 0.85,
    unitPrice: 1.75,
    supplierId: "s2",
    supplier: "Sweet Ingredients Co.",
    location: "Prateleira A2",
    stockLocation: "cozinha",
    lastUpdated: "2023-06-12T09:15:00Z",
  },
  {
    id: "p3",
    name: "Gotas de Chocolate",
    sku: "CC-003",
    category: "Aditivos para Panificação",
    currentStock: 28,
    minStockLevel: 10,
    unitCost: 2.5,
    unitPrice: 4.25,
    supplierId: "s3",
    supplier: "Cocoa Delights Inc.",
    location: "Prateleira B1",
    stockLocation: "cozinha",
    lastUpdated: "2023-06-11T11:45:00Z",
  },
  {
    id: "p4",
    name: "Extrato de Baunilha",
    sku: "VE-004",
    category: "Aromatizantes",
    currentStock: 15,
    minStockLevel: 5,
    unitCost: 4.75,
    unitPrice: 8.99,
    supplierId: "s4",
    supplier: "Flavor Essentials Inc.",
    location: "Prateleira C3",
    stockLocation: "bar",
    lastUpdated: "2023-06-09T16:20:00Z",
  },
];

// Mock data for recipes
const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Cookies de Chocolate",
    description:
      "Cookies de chocolate clássicos com borda crocante e centro macio",
    ingredients: [
      {
        productId: "p1",
        productName: "Farinha (Uso Geral)",
        quantity: 2.5,
        unitCost: 1.25,
        totalCost: 3.13,
      },
      {
        productId: "p2",
        productName: "Açúcar (Granulado)",
        quantity: 1,
        unitCost: 0.85,
        totalCost: 0.85,
      },
      {
        productId: "p3",
        productName: "Gotas de Chocolate",
        quantity: 1.5,
        unitCost: 2.5,
        totalCost: 3.75,
      },
    ],
    sellingPrice: 12.99,
    totalCost: 7.73,
    profitMargin: 40.49,
    preparationMethod:
      "Misturar ingredientes secos, adicionar manteiga derretida, formar cookies e assar por 12 minutos a 180°C.",
    preparationTime: 30,
    portionSize: "12 cookies médios",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-10T14:45:00Z",
  },
];

// Mock data for audit results
const auditResults: SalesAuditResult[] = [
  {
    productId: "p3",
    productName: "Gotas de Chocolate",
    expectedStock: 25,
    actualStock: 28,
    difference: 3,
    stockLocation: "cozinha",
  },
  {
    productId: "p1",
    productName: "Farinha (Uso Geral)",
    expectedStock: 30,
    actualStock: 35,
    difference: 5,
    stockLocation: "cozinha",
  },
];

export default function SalesAuditing() {
  const { t, formatCurrency } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("sales");
  const [selectedLocation, setSelectedLocation] = useState<
    StockLocationType | "all"
  >("all");
  const [isAddSaleDialogOpen, setIsAddSaleDialogOpen] = useState(false);
  const [showAuditResults, setShowAuditResults] = useState(false);

  const filteredSales = salesData.filter((sale) => {
    const matchesSearch = sale.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === "all" || sale.stockLocation === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  const handleCompareWithStock = () => {
    setShowAuditResults(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t("salesAuditing")}
        </h2>
        <Dialog
          open={isAddSaleDialogOpen}
          onOpenChange={setIsAddSaleDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t("enterSalesData")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{t("enterSalesData")}</DialogTitle>
              <DialogDescription>
                {t("enterSalesDataDescription")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    {t("salesDate")}
                  </label>
                  <Input
                    id="date"
                    type="date"
                    placeholder={t("enterSalesDate")}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="stockLocation"
                    className="text-sm font-medium"
                  >
                    {t("stockLocation")}
                  </label>
                  <Select defaultValue="cozinha">
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectStockLocation")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sala">{t("sala")}</SelectItem>
                      <SelectItem value="bar">{t("bar")}</SelectItem>
                      <SelectItem value="cozinha">{t("cozinha")}</SelectItem>
                      <SelectItem value="eventos">{t("eventos")}</SelectItem>
                      <SelectItem value="discoteca">
                        {t("discoteca")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="product" className="text-sm font-medium">
                  {t("product")}
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectProduct")} />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    {t("quantity")}
                  </label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder={t("enterQuantity")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unitPrice" className="text-sm font-medium">
                    {t("unitPrice")}
                  </label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    placeholder={t("enterUnitPrice")}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  {t("notes")}
                </label>
                <Input id="notes" placeholder={t("enterNotes")} />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddSaleDialogOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button onClick={() => setIsAddSaleDialogOpen(false)}>
                {t("add")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        defaultValue="sales"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">{t("salesData")}</TabsTrigger>
          <TabsTrigger value="audit">{t("auditResults")}</TabsTrigger>
          <TabsTrigger value="reports">{t("salesReport")}</TabsTrigger>
        </TabsList>

        {/* Sales Data Tab */}
        <TabsContent value="sales" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedLocation}
              onValueChange={(value) =>
                setSelectedLocation(value as StockLocationType | "all")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("stockLocation")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="sala">{t("sala")}</SelectItem>
                <SelectItem value="bar">{t("bar")}</SelectItem>
                <SelectItem value="cozinha">{t("cozinha")}</SelectItem>
                <SelectItem value="eventos">{t("eventos")}</SelectItem>
                <SelectItem value="discoteca">{t("discoteca")}</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchProducts")}
                className="pl-8 w-full md:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">
                {t("salesData")} ({filteredSales.length})
              </h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                {t("export")}
              </Button>
              <Button size="sm" onClick={handleCompareWithStock}>
                {t("compareWithStock")}
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>{t("date")}</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>{t("product")}</TableHead>
                  <TableHead className="text-right">{t("quantity")}</TableHead>
                  <TableHead className="text-right">{t("unitPrice")}</TableHead>
                  <TableHead className="text-right">
                    {t("salesTotal")}
                  </TableHead>
                  <TableHead>{t("stockLocation")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {new Date(sale.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.productName}
                      {sale.recipeId && (
                        <span className="ml-2 text-xs bg-muted px-1 py-0.5 rounded">
                          {t("recipe")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {sale.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(sale.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(sale.totalPrice)}
                    </TableCell>
                    <TableCell>
                      {t(sale.stockLocation as keyof typeof t)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Audit Results Tab */}
        <TabsContent value="audit" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedLocation}
              onValueChange={(value) =>
                setSelectedLocation(value as StockLocationType | "all")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("stockLocation")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="sala">{t("sala")}</SelectItem>
                <SelectItem value="bar">{t("bar")}</SelectItem>
                <SelectItem value="cozinha">{t("cozinha")}</SelectItem>
                <SelectItem value="eventos">{t("eventos")}</SelectItem>
                <SelectItem value="discoteca">{t("discoteca")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {t("moreFilters")}
            </Button>
          </div>

          {showAuditResults ? (
            <>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {t("stockDiscrepancies")}
                </h3>
                <Button variant="outline" size="sm">
                  <FileDown className="mr-2 h-4 w-4" />
                  {t("export")}
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("product")}</TableHead>
                      <TableHead className="text-right">
                        {t("expectedStock")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("actualStock")}
                      </TableHead>
                      <TableHead className="text-right">
                        {t("difference")}
                      </TableHead>
                      <TableHead>{t("stockLocation")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditResults
                      .filter(
                        (result) =>
                          selectedLocation === "all" ||
                          result.stockLocation === selectedLocation,
                      )
                      .map((result) => (
                        <TableRow key={result.productId}>
                          <TableCell className="font-medium">
                            {result.productName}
                          </TableCell>
                          <TableCell className="text-right">
                            {result.expectedStock}
                          </TableCell>
                          <TableCell className="text-right">
                            {result.actualStock}
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                result.difference !== 0
                                  ? "text-destructive font-medium"
                                  : "text-green-600 font-medium"
                              }
                            >
                              {result.difference > 0 ? "+" : ""}
                              {result.difference}
                            </span>
                          </TableCell>
                          <TableCell>
                            {t(result.stockLocation as keyof typeof t)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-md border bg-card p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {auditResults.some((r) => r.difference !== 0) ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    <h3 className="text-lg font-medium">{t("summary")}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{t("totalProducts")}:</span>
                      <span>{auditResults.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("discrepancies")}:</span>
                      <span>
                        {auditResults.filter((r) => r.difference !== 0).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("recipeUsage")}:</span>
                      <span>
                        {salesData.filter((s) => s.recipeId).length}{" "}
                        {t("items")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border bg-card p-4">
                  <h3 className="text-lg font-medium mb-2">{t("chart")}</h3>
                  <div className="flex items-center justify-center h-40 bg-muted/30 rounded-md">
                    <BarChart className="h-10 w-10 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {t("salesVsStock")}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-medium">
                  {t("noAuditResultsYet")}
                </h3>
                <p className="text-muted-foreground">
                  {t("compareStockToSeeResults")}
                </p>
                <Button onClick={handleCompareWithStock}>
                  {t("compareWithStock")}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Sales Report Tab */}
        <TabsContent value="reports" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <DatePickerWithRange className="w-full" />
            </div>
            <Select
              value={selectedLocation}
              onValueChange={(value) =>
                setSelectedLocation(value as StockLocationType | "all")
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("stockLocation")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all")}</SelectItem>
                <SelectItem value="sala">{t("sala")}</SelectItem>
                <SelectItem value="bar">{t("bar")}</SelectItem>
                <SelectItem value="cozinha">{t("cozinha")}</SelectItem>
                <SelectItem value="eventos">{t("eventos")}</SelectItem>
                <SelectItem value="discoteca">{t("discoteca")}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {t("moreFilters")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">
                  {t("salesByProduct")}
                </h3>
                <div className="flex items-center justify-center h-64 bg-muted/30 rounded-md">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {t("salesByProduct")}
                  </span>
                </div>
              </div>

              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">
                  {t("salesByLocation")}
                </h3>
                <div className="flex items-center justify-center h-64 bg-muted/30 rounded-md">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {t("salesByLocation")}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">{t("summary")}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("dailySales")}</span>
                    <span className="font-bold">
                      {formatCurrency(
                        filteredSales
                          .filter(
                            (s) =>
                              new Date(s.date).toDateString() ===
                              new Date().toDateString(),
                          )
                          .reduce((sum, s) => sum + s.totalPrice, 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("weeklySales")}</span>
                    <span className="font-bold">
                      {formatCurrency(
                        filteredSales.reduce((sum, s) => sum + s.totalPrice, 0),
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{t("monthlySales")}</span>
                    <span className="font-bold">
                      {formatCurrency(
                        filteredSales.reduce(
                          (sum, s) => sum + s.totalPrice,
                          0,
                        ) * 4,
                      )}
                    </span>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      {t("topProducts")}
                    </h4>
                    <div className="space-y-2">
                      {Array.from(
                        new Set(filteredSales.map((s) => s.productId)),
                      )
                        .slice(0, 3)
                        .map((productId) => {
                          const productSales = filteredSales.filter(
                            (s) => s.productId === productId,
                          );
                          const totalSales = productSales.reduce(
                            (sum, s) => sum + s.totalPrice,
                            0,
                          );
                          const product = products.find(
                            (p) => p.id === productId,
                          );
                          return (
                            <div
                              key={productId}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm truncate">
                                {product?.name}
                              </span>
                              <span className="font-medium">
                                {formatCurrency(totalSales)}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border bg-card p-4">
                <h3 className="text-lg font-medium mb-4">
                  {t("salesByCategory")}
                </h3>
                <div className="flex items-center justify-center h-40 bg-muted/30 rounded-md">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    {t("salesByCategory")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
