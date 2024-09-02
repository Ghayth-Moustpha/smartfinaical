<!-- layout/main_layout.php -->
<?php
  include __DIR__ . '/../includes/head.php';
  include __DIR__ . '/../includes/top-header.php';
  include __DIR__ . '/../includes/mid-header.php';
  include __DIR__ . '/../includes/nav.php';
  // Enable error reporting
error_reporting(E_ALL);

// Display errors on the screen
ini_set('display_errors', 1);
?>
<body> 


    <?php
      // This is where the individual page content will be included
      if (isset($content)) {
          include $content;
      } else {
          echo "<p>No content available</p>";
      }
    ?>

<?php
  // Include the footer
  include __DIR__ . '/../includes/footer.php';
?>

 <script src="./assets/js/script.js"></script>
 </body>
</html>
