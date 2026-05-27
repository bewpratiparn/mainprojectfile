#!/bin/bash
find src/pages -name "*.css" -type f | while read file; do
  # Replace white backgrounds
  sed -i '' -e 's/background-color: *white;/background-color: #1e1e1e;/g' "$file"
  sed -i '' -e 's/background-color: *#fff;/background-color: #1e1e1e;/g' "$file"
  sed -i '' -e 's/background-color: *rgb(255, 255, 255);/background-color: rgba(30, 30, 30, 0.9);/g' "$file"
  sed -i '' -e 's/background-color: *rgba(255, 255, 255, 0.8);/background-color: rgba(30, 30, 30, 0.8);/g' "$file"
  
  # Replace light gray backgrounds
  sed -i '' -e 's/background-color: *#f0f0f0;/background-color: #2c2c2c;/g' "$file"
  sed -i '' -e 's/background-color: *#e6e6e6;/background-color: #383838;/g' "$file"
  sed -i '' -e 's/background-color: *lightgray;/background-color: #2c2c2c;/g' "$file"

  # Replace text colors
  sed -i '' -e 's/color: *#333;/color: #ffffff;/g' "$file"
  sed -i '' -e 's/color: *#555;/color: #b0bec5;/g' "$file"
  sed -i '' -e 's/color: *black;/color: #ffffff;/g' "$file"
  sed -i '' -e 's/color: *#000;/color: #ffffff;/g' "$file"
  
  # Replace blue colors with orange (since primary theme is orange)
  sed -i '' -e 's/color: *#007bff;/color: #ff9800;/g' "$file"
  sed -i '' -e 's/border-color: *#007bff;/border-color: #ff9800;/g' "$file"
  sed -i '' -e 's/background-color: *#007bff;/background-color: #ff9800;/g' "$file"

  # Fix the primary button colors from original MUI default blue
  sed -i '' -e 's/background-color: *#1976d2;/background-color: #ff9800;/g' "$file"
  
done
echo "CSS files updated for dark mode."
