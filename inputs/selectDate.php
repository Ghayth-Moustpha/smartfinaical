<div class="custom-select">
  <span
    class="select-button"
    role="combobox"
    aria-label="select button"
    aria-haspopup="listbox"
    aria-expanded="false"
    aria-controls="select-dropdown"
  >
    <span class="selected-value">Select Vehicle Year</span>
    <span class="arrow"></span>
</span>

  <ul class="select-dropdown" role="listbox" id="select-dropdown">
    <?php for ($i = 2025; $i >= 1986; $i--): ?>
      <li role="option">
        <input type="radio" id="<?= $i ?>" name="year" value="<?= $i ?>" />
        <label for="<?= $i ?>"><?= $i ?></label>
      </li>
    <?php endfor; ?>
  </ul>
</div>

