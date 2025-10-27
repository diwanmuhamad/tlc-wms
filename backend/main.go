package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"
)

type Temperature struct {
	RoomID      string  `json:"room_id"`
	Temperature float64 `json:"temperature"`
}

type Inventory struct {
	SKU      string `json:"sku"`
	Name     string `json:"name"`
	Batch    string `json:"batch"`
	Expiry   string `json:"expiry"`
	Qty      int    `json:"qty"`
	Location string `json:"location"`
}

type Location struct {
	ID    string `json:"id"`
	Label string `json:"label"`
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/temperatures", getTemperatures)
	mux.HandleFunc("/inventory", getInventory)
	mux.HandleFunc("/locations", getLocations)

	// Enable CORS
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // your frontend
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(mux)

	log.Println("✅ Server running at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

// helper to read JSON from file
func readJSONFile[T any](filename string) ([]T, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var data []T
	if err := json.NewDecoder(file).Decode(&data); err != nil {
		return nil, err
	}
	return data, nil
}

func getTemperatures(w http.ResponseWriter, r *http.Request) {
	data, err := readJSONFile[Temperature]("data/temperatures.json")
	if err != nil {
		http.Error(w, "Failed to read temperatures", http.StatusInternalServerError)
		return
	}
	writeJSON(w, data)
}

func getInventory(w http.ResponseWriter, r *http.Request) {
	data, err := readJSONFile[Inventory]("data/inventory.json")
	if err != nil {
		http.Error(w, "Failed to read inventory", http.StatusInternalServerError)
		return
	}
	writeJSON(w, data)
}

func getLocations(w http.ResponseWriter, r *http.Request) {
	data, err := readJSONFile[Location]("data/locations.json")
	if err != nil {
		http.Error(w, "Failed to read locations", http.StatusInternalServerError)
		return
	}
	writeJSON(w, data)
}

func writeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
